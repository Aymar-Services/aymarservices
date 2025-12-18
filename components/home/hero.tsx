"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Menu, X } from "lucide-react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const techLogos = [
    {
      name: "Next.js",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M11.5 0C5.15 0 0 5.15 0 11.5S5.15 23 11.5 23 23 17.85 23 11.5 17.85 0 11.5 0zm5.9 18.5L8.7 7.3h2.4l6.6 8.8v2.4h-1.3zm-10.6 0V4.7h1.9v13.8h-1.9z" />
        </svg>
      ),
      color: "text-white",
    },
    {
      name: "React",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 2c-2.5 0-5 .5-7 1.5C3 4.5 2 6 2 7.5c0 1.5 1 3 3 4 1 .5 2 1 3.5 1.5-1 1.5-1.5 3-1.5 4.5 0 1.5.5 3 1.5 4 1 1 2.5 1.5 4 1.5s3-.5 4-1.5c1-1 1.5-2.5 1.5-4 0-1.5-.5-3-1.5-4.5 1.5-.5 2.5-1 3.5-1.5 2-1 3-2.5 3-4 0-1.5-1-3-3-4-2-1-4.5-1.5-7-1.5zm0 2c2 0 4 .5 5.5 1 1.5.5 2.5 1.5 2.5 2.5s-1 2-2.5 2.5c-1.5.5-3.5 1-5.5 1s-4-.5-5.5-1C4.5 9.5 3.5 8.5 3.5 7.5S4.5 5.5 6 5c1.5-.5 3-1 4.5-1z" />
        </svg>
      ),
      color: "text-cyan-400",
    },
    {
      name: "TypeScript",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.457.53 1.39.934 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.244-.651-.88-.625-.926.011-.015.11-.078.22-.141.108-.061.509-.294.889-.515l.69-.4.165.242c.226.331.662.76.949.915.766.41 1.817.352 2.335-.118a.883.883 0 0 0 .214-.77c-.033-.235-.131-.406-.33-.568-.22-.18-.659-.42-1.706-.925-1.197-.579-1.719-.997-2.146-1.715-.257-.434-.37-.862-.398-1.508-.023-.517.025-.815.19-1.231.358-.904 1.174-1.544 2.222-1.745.328-.063 1.371-.044 1.709.03z" />
        </svg>
      ),
      color: "text-blue-500",
    },
    {
      name: "Laravel",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.013-.012.027-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.031.021.044.033l.038.027c.013.014.02.03.032.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.039-.01-.012-.021-.023-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
        </svg>
      ),
      color: "text-red-600",
    },
    {
      name: "WordPress",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.607-3.582.607M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
        </svg>
      ),
      color: "text-blue-600",
    },
    {
      name: "Python",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
        </svg>
      ),
      color: "text-yellow-400",
    },
    {
      name: "Rust",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M23.834 11.564a.75.75 0 000-1.128l-1.446-.998a9.025 9.025 0 00-.221-.62l.588-1.622a.75.75 0 00-.341-.936L21 5.596a9.091 9.091 0 00-.503-.424l.147-1.708a.75.75 0 00-.612-.762l-1.7-.278a9.087 9.087 0 00-.595-.242L16.62.75a.75.75 0 00-.9-.433l-1.647.47a9.115 9.115 0 00-.637-.053l-1.089-1.424a.75.75 0 00-1.198 0L9.954.734a9.115 9.115 0 00-.637.053L7.67.317a.75.75 0 00-.9.433l-1.116 1.432a9.087 9.087 0 00-.595.242l-1.7.278a.75.75 0 00-.612.762L2.894 5.172a9.091 9.091 0 00-.503.424l-1.414.664a.75.75 0 00-.341.936l.588 1.622a9.025 9.025 0 00-.221.62L.166 10.436a.75.75 0 000 1.128l1.446.998c.05.21.116.418.221.62l-.588 1.622a.75.75 0 00.341.936L3 16.404c.151.15.321.29.503.424l-.147 1.708a.75.75 0 00.612.762l1.7.278c.188.091.386.17.595.242l1.116 1.432a.75.75 0 00.9.433l1.647-.47c.206.03.42.05.637.053l1.089 1.424a.75.75 0 001.198 0l1.195-1.424c.217-.003.431-.023.637-.053l1.647.47a.75.75 0 00.9-.433l1.116-1.432c.209-.072.407-.151.595-.242l1.7-.278a.75.75 0 00.612-.762l-.147-1.708c.182-.134.352-.274.503-.424l1.414-.664a.75.75 0 00.341-.936l-.588-1.622a9.025 9.025 0 00.221-.62zM12 17.157a5.157 5.157 0 110-10.314 5.157 5.157 0 010 10.314z" />
        </svg>
      ),
      color: "text-orange-600",
    },
    {
      name: "Go",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.082-.105.082zm2.828 1.063c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.365c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 01.292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 01-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2zm3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 01-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.63.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788.935-2.045 2.033-.21.912.234 1.835 1.075 2.21.643.28 1.285.244 1.905-.07.923-.48 1.425-1.228 1.484-2.233z" />
        </svg>
      ),
      color: "text-cyan-500",
    },
    {
      name: "TensorFlow",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603z" />
        </svg>
      ),
      color: "text-orange-500",
    },
    {
      name: "Node.js",
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M11.998 0c-.321 0-.641.084-.933.25l-8.13 4.69c-.574.332-.934.94-.934 1.596v9.407c0 .657.36 1.265.935 1.597l2.16 1.247c1.174.588 1.593.588 2.133.588 1.75 0 2.749-1.063 2.749-2.912V7.036c0-.131-.098-.229-.229-.229H8.684c-.131 0-.229.098-.229.229v9.427c0 .737-.754 1.47-1.977.85l-2.26-1.304c-.065-.033-.098-.098-.098-.164V6.438c0-.065.033-.131.098-.164l8.13-4.69c.065-.033.131-.033.197 0l8.13 4.69c.065.033.098.098.098.164v9.407c0 .065-.033.131-.098.164l-8.13 4.69c-.065.033-.131.033-.197 0l-2.065-1.224c-.066-.033-.131-.033-.197 0-.558.328-1.116.66-1.182.722-.197.131-.493.328.033.66l2.684 1.584c.295.164.623.25.95.25s.656-.086.95-.25l8.13-4.69c.574-.332.934-.94.934-1.597V6.438c0-.657-.36-1.265-.935-1.597l-8.13-4.69C12.64.084 12.32 0 11.998 0zm2.749 6.536c-2.486 0-4.004 1.048-4.004 2.798 0 1.896 1.47 2.421 3.9 2.65 2.912.262 3.147.656 3.147 1.18 0 .918-.737 1.305-2.486 1.305-2.191 0-2.683-.557-2.847-1.666-.033-.098-.098-.197-.229-.197h-1.08c-.131 0-.229.098-.229.229 0 1.338.738 2.93 4.385 2.93 2.617 0 4.135-1.031 4.135-2.831 0-1.896-1.273-2.421-3.933-2.798-2.683-.377-3.114-.557-3.114-1.207 0-.557.245-1.338 2.355-1.338 1.896 0 2.584.41 2.864 1.698.033.098.098.164.197.164h1.08c.066 0 .131-.033.164-.098.033-.033.033-.098.033-.164-.197-2.306-1.666-3.376-4.338-3.376z" />
        </svg>
      ),
      color: "text-green-500",
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <>
      <section ref={ref} className="relative overflow-hidden min-h-screen flex flex-col pt-16 md:pt-20" id="hero">
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 backdrop-blur-xl bg-black/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              <a href="#" className="flex items-center gap-3 group">
                {/* Custom Aymar Calligraphy Logo */}
                <div className="relative w-10 h-10 md:w-12 md:h-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Outer circle with gradient */}
                    <defs>
                      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e78a53" />
                        <stop offset="100%" stopColor="#ff6b35" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="48" fill="none" stroke="url(#logoGradient)" strokeWidth="3" />
                    {/* Stylized 'A' in calligraphy style */}
                    <path
                      d="M 35 70 L 50 25 L 65 70 M 42 55 L 58 55"
                      stroke="url(#logoGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Decorative flourish */}
                    <path
                      d="M 30 75 Q 50 78 70 75"
                      stroke="url(#logoGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(231, 138, 83, 0.3) 0%, transparent 70%)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold tracking-tight text-[#e78a53] group-hover:text-[#ff6b35] transition-colors">
                    Aymar Services
                  </span>
                  <span className="text-[10px] md:text-xs text-white/90 tracking-wider font-light -mt-1">
                    Beat the Best
                  </span>
                </div>
              </a>
              <div className="md:hidden">
                <Button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</Button>
              </div>
            </div>
          </div>
        </nav>

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-4 py-24 sm:py-32 relative z-10 flex-1 flex flex-col"
        >
          <div className="mx-auto max-w-4xl text-center flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                  Fast turnaround guaranteed
                </Badge>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h1
                id="main-title"
                className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Transform Your <strong>Business</strong>
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  with{" "}
                  <motion.strong
                    className="text-primary"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(231, 138, 83, 0)",
                        "0 0 20px rgba(231, 138, 83, 0.5)",
                        "0 0 0px rgba(231, 138, 83, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    AI
                  </motion.strong>
                  ,{" "}
                  <motion.strong
                    className="text-primary"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(231, 138, 83, 0)",
                        "0 0 20px rgba(231, 138, 83, 0.5)",
                        "0 0 0px rgba(231, 138, 83, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    Web
                  </motion.strong>{" "}
                  &{" "}
                  <motion.strong
                    className="text-primary"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(231, 138, 83, 0)",
                        "0 0 20px rgba(231, 138, 83, 0.5)",
                        "0 0 0px rgba(231, 138, 83, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  >
                    Mobile
                  </motion.strong>
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground text-balance"
            >
              We deliver cutting-edge technology solutions on time. From AI-powered applications to modern web platforms
              and mobile apps - we build what matters, fast.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.svg
                width="100"
                height="50"
                viewBox="0 0 100 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground mt-8"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <path d="M68.6958 5.40679C67.3329 12.7082 68.5287 20.1216 68.5197 27.4583C68.5189 29.5382 68.404 31.6054 68.1147 33.682C67.9844 34.592 69.4111 34.751 69.5414 33.8411C70.5618 26.5016 69.2488 19.104 69.4639 11.7325C69.5218 9.65887 69.7222 7.6012 70.0939 5.56265C70.1638 5.1949 69.831 4.81112 69.4601 4.76976C69.0891 4.72841 68.7689 5.01049 68.6958 5.40679Z"></path>
                <path d="M74.0117 26.1349C73.2662 27.1206 72.5493 28.1096 72.0194 29.235C71.5688 30.167 71.2007 31.137 70.7216 32.0658C70.4995 32.5033 70.252 32.9091 69.9475 33.3085C69.8142 33.4669 69.6779 33.654 69.5161 33.8093C69.4527 33.86 68.9199 34.2339 68.9167 34.2624C68.9263 34.1768 69.0752 34.3957 69.0055 34.2434C68.958 34.1515 68.8534 34.0531 68.8058 33.9612C68.6347 33.6821 68.4637 33.403 68.264 33.1208L67.1612 31.3512C66.3532 30.0477 65.5199 28.7126 64.7119 27.4093C64.5185 27.0699 63.9701 27.0666 63.7131 27.2979C63.396 27.5514 63.4053 27.9858 63.6018 32.0337C64.3845 29.5683 65.1956 30.8431 65.9783 32.1149L67.1572 33.9796C67.5025 34.5093 67.8225 35.2671 68.428 35.5368C69.6136 36.0446 70.7841 34.615 71.3424 33.7529C71.9992 32.786 72.4085 31.705 72.9035 30.6336C73.4842 29.3116 74.2774 28.1578 75.1306 26.9818C75.7047 26.2369 74.5573 25.3868 74.0117 26.1349ZM55.1301 12.2849C54.6936 18.274 54.6565 24.3076 55.0284 30.3003C55.1293 31.987 55.2555 33.7056 55.4419 35.4019C55.5431 36.3087 56.9541 36.0905 56.8529 35.1837C56.2654 29.3115 56.0868 23.3982 56.2824 17.4978C56.3528 15.8301 56.4263 14.1339 56.5537 12.4725C56.6301 11.5276 55.2034 11.3686 55.1301 12.2849Z"></path>
                <path d="M59.2642 30.6571C58.8264 31.475 58.36 32.2896 57.9222 33.1075C57.7032 33.5164 57.4843 33.9253 57.2369 34.3311C57.0528 34.6861 56.8656 35.0697 56.6278 35.3898C56.596 35.4152 56.5611 35.4691 56.5294 35.4944C56.4881 35.6054 56.5041 35.4627 56.5548 35.5261C56.7481 35.6055 56.8337 35.6151 56.7545 35.5484L56.6784 35.4533C56.6023 35.3581 56.5263 35.263 56.4534 35.1393C56.1778 34.7619 55.8734 34.3814 55.5946 34.0324C55.0146 33.2744 54.4315 32.545 53.8515 31.787C53.2685 31.0576 52.1584 31.945 52.7415 32.6744C53.4229 33.5592 54.1042 34.4441 54.7888 35.3004C55.1184 35.7127 55.4321 36.2677 55.8569 36.6039C56.3069 36.9719 56.884 36.9784 57.3533 36.6551C57.7624 36.3542 57.9845 35.9167 58.2067 35.4792C58.4636 34.9878 58.746 34.5282 59.003 34.0369C59.5423 33.0859 60.0563 32.1032 60.5957 31.1522C60.7765 30.8257 60.5104 30.3627 60.2092 30.2135C59.8161 30.112 59.4451 30.3305 59.2642 30.6571ZM44.5918 10.1569L42.2324 37.5406C42.0032 40.1151 41.8057 42.6641 41.5764 45.2386C41.5032 46.1549 42.9299 46.314 43.0032 45.3977L45.3626 18.014C45.5918 15.4396 45.7893 12.8905 46.0186 10.316C46.1235 9.37433 44.6968 9.21532 44.5918 10.1569Z"></path>
                <path d="M48.101 37.7616C46.7404 38.8232 45.8267 40.2814 44.9163 41.7109C44.0407 43.0866 43.1365 44.4592 41.738 45.3434C42.1247 45.5019 42.5146 45.6321 42.9014 45.7908C42.1324 41.8051 41.04 37.8699 39.6781 34.0203C39.545 33.6589 39.0695 33.5191 38.7365 33.6553C38.3719 33.817 38.2385 34.2353 38.3716 34.5969C39.7209 38.3007 40.7404 42.1121 41.4904 46.009C41.6012 46.5703 42.1877 46.7512 42.6539 46.4565C45.5462 44.6124 46.3877 40.9506 49.0169 38.8748C49.7178 38.2884 48.8304 37.1784 48.101 37.7616ZM25.9671 13.1014C25.7028 16.2497 26.0758 19.3824 26.5091 22.4929C26.9645 25.6636 27.4166 28.863 27.872 32.0337C28.1346 33.8253 28.3971 35.6167 28.631 37.4051C28.7607 38.3151 30.1717 38.0968 30.042 37.1868C29.5866 34.016 29.1281 30.8738 28.7012 27.7062C28.2647 24.6242 27.7396 21.5612 27.449 18.4666C27.2943 16.7449 27.2283 15.0042 27.3653 13.2572C27.4671 12.3442 26.0404 12.1851 25.9671 13.1014Z"></path>
                <path d="M30.5625 27.3357C29.9525 30.7343 29.3425 34.133 28.704 37.5284C29.1225 37.4018 29.5411 37.2751 29.9882 37.1516C28.6034 35.0617 27.2504 32.9465 25.8655 30.8565C25.6406 30.5425 25.1523 30.517 24.8669 30.7451C24.5497 30.9987 24.5305 31.4299 24.7555 31.7439C26.1403 33.8338 27.4933 35.9491 28.8781 38.039C29.2489 38.6003 30.0417 38.2265 30.1624 37.6621C30.7724 34.2635 31.3824 30.8648 32.0209 27.4694C32.0908 27.1016 31.758 26.7178 31.3871 26.6765C30.9559 26.6573 30.6324 26.9679 30.5625 27.3357Z"></path>
              </motion.svg>

              <div className="flex items-center justify-center">
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById("contact")
                    if (element) {
                      const headerOffset = 120
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerOffset

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  <motion.div
                    className="group cursor-pointer border border-border bg-card gap-2 h-[60px] flex items-center p-[10px] rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="border border-border bg-primary h-[40px] rounded-full flex items-center justify-center text-primary-foreground"
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(231, 138, 83, 0)",
                          "0 0 20px rgba(231, 138, 83, 0.5)",
                          "0 0 0px rgba(231, 138, 83, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <p className="font-medium tracking-tight mr-3 ml-3 flex items-center gap-2 justify-center text-base">
                        <Zap className="h-4 w-4" />
                        Start Your Project
                      </p>
                    </motion.div>
                    <div className="text-muted-foreground group-hover:ml-4 ease-in-out transition-all size-[24px] flex items-center justify-center rounded-full border-2 border-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right group-hover:rotate-180 ease-in-out transition-all"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-auto pb-8"
          >
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-6">Powered by industry-leading technologies</p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {techLogos.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <motion.div
                      className={`w-12 h-12 ${tech.color} transition-all duration-300`}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      {tech.logo}
                    </motion.div>
                    <motion.div
                      className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${tech.color.replace("text-", "rgb(var(--")}20) 0%, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
