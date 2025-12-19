"use client"

import { useState, useCallback } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [pausedCards, setPausedCards] = useState<{ [key: number]: boolean }>({})
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => prev === index ? null : index)
  }

  const faqs = [
    {
      question: "How quickly can you start?",
      answer:
        "We can begin within 1-2 business days after consultation. For urgent projects, we offer expedited onboarding.",
    },
    {
      question: "What are typical timelines?",
      answer:
        "Web apps in 2-4 weeks, mobile apps in 4-6 weeks, and AI integrations in 3-5 weeks. We deliver in sprints.",
    },
    {
      question: "Can you integrate AI?",
      answer: "Absolutely. We add chatbots, automation, and ML models to your platforms without disrupting operations.",
    },
    {
      question: "Do you provide support?",
      answer: "Yes. We offer maintenance packages including bug fixes, updates, and technical support.",
    },
    {
      question: "What technologies do you use?",
      answer: "We use React, Next.js, React Native, Python, TensorFlow, and cloud services like AWS and Vercel.",
    },
    {
      question: "How do you handle payments?",
      answer: "We offer flexible payment plans with milestones. Initial deposit required, balance on delivery.",
    },
  ]

  return (
    <section ref={ref} className="relative z-20 overflow-hidden pb-16 pt-12 md:pb-32 md:pt-16 lg:pb-40 lg:pt-20">
      <div className="bg-primary/20 absolute top-1/2 -right-20 z-0 h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-primary/20 absolute top-1/2 -left-20 z-0 h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="border-primary/40 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 uppercase">
            <span>✶</span>
            <span className="text-sm">Faqs</span>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-4 mb-8 max-w-xl text-center text-2xl font-medium md:text-3xl md:mt-6 md:mb-12 lg:text-4xl xl:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Questions? We've got{" "}
          <span className="bg-gradient-to-b from-foreground via-rose-200 to-primary bg-clip-text text-transparent">
            answers
          </span>
        </motion.h2>

        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 items-start">
          {faqs.map((faq, index) => (
            <motion.div
              key={`faq-${index}`}
              className="from-secondary/40 to-secondary/10 rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-b p-3 md:p-4 lg:p-5 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:border-white/20 cursor-pointer relative overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(index)}
              onMouseEnter={() => setPausedCards((prev) => ({ ...prev, [index]: true }))}
              onMouseLeave={() => setPausedCards((prev) => ({ ...prev, [index]: false }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                animate={
                  !pausedCards[index] && isInView
                    ? {
                        background: [
                          "radial-gradient(circle at 0% 0%, rgba(231, 138, 83, 0.2) 0%, transparent 50%)",
                          "radial-gradient(circle at 100% 100%, rgba(231, 138, 83, 0.2) 0%, transparent 50%)",
                          "radial-gradient(circle at 0% 0%, rgba(231, 138, 83, 0.2) 0%, transparent 50%)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-0 opacity-0 pointer-events-none"
                animate={
                  !pausedCards[index] && isInView
                    ? {
                        opacity: [0, 0.1, 0],
                        x: ["-100%", "200%"],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                  ease: "linear",
                }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(231, 138, 83, 0.3), transparent)",
                }}
              />

              <div className="flex items-start justify-between gap-2 md:gap-3 relative z-10">
                <h3 className="m-0 font-medium text-xs md:text-sm leading-snug">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="text-primary transition duration-300" size={16} />
                  ) : (
                    <Plus className="text-primary transition duration-300" size={16} />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key={index}
                    className="text-muted-foreground text-[11px] md:text-xs leading-relaxed relative z-10 mt-2 md:mt-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
