import fs from "node:fs";
import zlib from "node:zlib";

const [, , inputPath, outputPath, thresholdArg = "235", mode = ""] = process.argv;
const threshold = Number(thresholdArg);

if (!inputPath || !outputPath || Number.isNaN(threshold)) {
  console.error("Usage: node scripts/remove-light-edge-bg.mjs input.png output.png [threshold]");
  process.exit(1);
}

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const data = fs.readFileSync(inputPath);

if (!data.subarray(0, 8).equals(pngSignature)) {
  throw new Error(`${inputPath} is not a PNG file`);
}

const chunks = [];
let offset = 8;
while (offset < data.length) {
  const length = data.readUInt32BE(offset);
  const type = data.subarray(offset + 4, offset + 8).toString("ascii");
  const chunkData = data.subarray(offset + 8, offset + 8 + length);
  chunks.push({ type, data: chunkData });
  offset += 12 + length;
  if (type === "IEND") break;
}

const ihdr = chunks.find((chunk) => chunk.type === "IHDR")?.data;
if (!ihdr) throw new Error("Missing IHDR chunk");

const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const bitDepth = ihdr[8];
const colorType = ihdr[9];
const interlace = ihdr[12];

if (bitDepth !== 8 || colorType !== 6 || interlace !== 0) {
  throw new Error("Only 8-bit non-interlaced RGBA PNG files are supported");
}

const compressed = Buffer.concat(chunks.filter((chunk) => chunk.type === "IDAT").map((chunk) => chunk.data));
const inflated = zlib.inflateSync(compressed);
const channels = 4;
const stride = width * channels;
const pixels = Buffer.alloc(width * height * channels);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let readOffset = 0;
for (let y = 0; y < height; y += 1) {
  const filter = inflated[readOffset];
  readOffset += 1;
  const row = inflated.subarray(readOffset, readOffset + stride);
  readOffset += stride;
  const out = pixels.subarray(y * stride, (y + 1) * stride);
  const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

  for (let x = 0; x < stride; x += 1) {
    const raw = row[x];
    const left = x >= channels ? out[x - channels] : 0;
    const up = prev ? prev[x] : 0;
    const upLeft = prev && x >= channels ? prev[x - channels] : 0;

    if (filter === 0) out[x] = raw;
    else if (filter === 1) out[x] = (raw + left) & 255;
    else if (filter === 2) out[x] = (raw + up) & 255;
    else if (filter === 3) out[x] = (raw + Math.floor((left + up) / 2)) & 255;
    else if (filter === 4) out[x] = (raw + paeth(left, up, upLeft)) & 255;
    else throw new Error(`Unsupported PNG filter ${filter}`);
  }
}

const visited = new Uint8Array(width * height);
const queue = [];

function pixelOffset(index) {
  return index * channels;
}

function isLightEdgeCandidate(index) {
  const p = pixelOffset(index);
  const alpha = pixels[p + 3];
  if (alpha === 0) return false;
  return pixels[p] >= threshold && pixels[p + 1] >= threshold && pixels[p + 2] >= threshold;
}

function enqueue(index) {
  if (!visited[index] && isLightEdgeCandidate(index)) {
    visited[index] = 1;
    queue.push(index);
  }
}

for (let x = 0; x < width; x += 1) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}
for (let y = 0; y < height; y += 1) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

for (let head = 0; head < queue.length; head += 1) {
  const index = queue[head];
  const x = index % width;
  const y = Math.floor(index / width);
  if (x > 0) enqueue(index - 1);
  if (x + 1 < width) enqueue(index + 1);
  if (y > 0) enqueue(index - width);
  if (y + 1 < height) enqueue(index + width);
}

for (const index of queue) {
  pixels[pixelOffset(index) + 3] = 0;
}

if (mode === "lighten-neutral") {
  for (let index = 0; index < width * height; index += 1) {
    const p = pixelOffset(index);
    if (pixels[p + 3] === 0) continue;
    const min = Math.min(pixels[p], pixels[p + 1], pixels[p + 2]);
    const max = Math.max(pixels[p], pixels[p + 1], pixels[p + 2]);
    if (max < 220 && max - min <= 35) {
      pixels[p] = 255;
      pixels[p + 1] = 255;
      pixels[p + 2] = 255;
    }
  }
}

const raw = Buffer.alloc(height * (stride + 1));
for (let y = 0; y < height; y += 1) {
  const target = y * (stride + 1);
  raw[target] = 0;
  pixels.copy(raw, target + 1, y * stride, (y + 1) * stride);
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, body) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(body.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, body])), 0);
  return Buffer.concat([length, typeBuffer, body, crc]);
}

const output = Buffer.concat([
  pngSignature,
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.writeFileSync(outputPath, output);
console.log(`Removed ${queue.length} edge background pixels from ${inputPath}`);
