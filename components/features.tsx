"use client"

import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Code, Smartphone, Brain, Sparkles, Zap, Shield } from "lucide-react"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const { theme } = useTheme()

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Enterprise Solutions & SaaS Platforms",
      details: [
        "Custom enterprise web applications with complex business logic and workflows",
        "SaaS platforms with subscription management, analytics, and multi-tenancy",
        "E-commerce solutions with payment gateways, inventory management, and order processing",
        "Progressive Web Apps (PWAs) that work offline and provide native-like experiences",
        "Real-time dashboards and data visualization tools for business intelligence",
        "API development and third-party integrations for seamless connectivity",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native & Cross-Platform Apps",
      details: [
        "Native iOS and Android apps for maximum performance and platform-specific features",
        "Cross-platform solutions using React Native and Flutter for faster time-to-market",
        "On-demand service apps with real-time tracking, payments, and notifications",
        "Social networking and community platforms with messaging and content sharing",
        "Enterprise mobile apps with offline-first capabilities and secure data sync",
        "IoT and Bluetooth-enabled apps for smart devices and wearables",
      ],
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Intelligence for Your Business",
      details: [
        "Custom chatbots and virtual assistants powered by GPT and LLM technologies",
        "Machine learning models for predictive analytics, forecasting, and recommendations",
        "Computer vision solutions for image recognition, quality control, and automation",
        "Natural Language Processing (NLP) for sentiment analysis, text extraction, and classification",
        "AI-powered automation to streamline workflows, reduce costs, and eliminate repetitive tasks",
        "Integration of AI capabilities into existing systems without major infrastructure changes",
      ],
    },
  ]

  return (
    <section id="services" className="text-foreground relative overflow-hidden py-12 sm:py-24 md:py-32">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12 px-4"
      >
        <h2
          className={cn(
            "via-foreground mb-8 bg-gradient-to-b from-zinc-800 to-zinc-700 bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px] text-balance",
            geist.className,
          )}
        >
          Our Services
        </h2>

        <motion.div
          className="group relative w-full max-w-6xl overflow-hidden rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-background to-background p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{
            scale: 1.01,
            borderColor: "rgba(231, 138, 83, 0.7)",
            boxShadow: "0 20px 60px rgba(231, 138, 83, 0.3)",
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={
              isInView
                ? {
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(231, 138, 83, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 50%, rgba(231, 138, 83, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 20% 50%, rgba(231, 138, 83, 0.3) 0%, transparent 50%)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-8">
              <motion.div
                className="rounded-2xl bg-primary/20 p-4 border border-primary/30"
                animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="w-12 h-12 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  AI-Powered Solutions
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Custom AI integrations, machine learning models, and intelligent automation to transform your business
                  processes and unlock new possibilities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
              {[
                { icon: "💬", label: "Chatbots", color: "from-blue-500/20 to-blue-600/20" },
                { icon: "🎯", label: "Predictions", color: "from-purple-500/20 to-purple-600/20" },
                { icon: "👁️", label: "Vision AI", color: "from-green-500/20 to-green-600/20" },
                { icon: "📊", label: "Analytics", color: "from-orange-500/20 to-orange-600/20" },
                { icon: "⚡", label: "Automation", color: "from-red-500/20 to-red-600/20" },
                { icon: "🔗", label: "Integration", color: "from-teal-500/20 to-teal-600/20" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 p-4 flex items-center gap-3`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
              animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>

        <div className="w-full max-w-6xl mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl border-2 border-secondary/40 bg-card p-6 shadow-lg transition-all hover:border-primary/60 hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={
                    isInView
                      ? {
                          backgroundImage: [
                            "radial-gradient(circle at 0% 0%, rgba(231, 138, 83, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 100%, rgba(231, 138, 83, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 0%, rgba(231, 138, 83, 0.3) 0%, transparent 50%)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Icon */}
                <div className="mb-4 flex items-center gap-3">
                  <motion.div
                    className="rounded-lg bg-primary/10 p-3 border border-primary/20"
                    animate={
                      isInView
                        ? {
                            boxShadow: [
                              "0 0 0px rgba(231, 138, 83, 0)",
                              "0 0 15px rgba(231, 138, 83, 0.3)",
                              "0 0 0px rgba(231, 138, 83, 0)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                  >
                    <service.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>

                {/* Details list */}
                <ul className="space-y-3">
                  {service.details.map((detail, detailIndex) => (
                    <motion.li
                      key={detailIndex}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.2 + detailIndex * 0.05 }}
                    >
                      <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{detail}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="w-full max-w-6xl mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {[
            { icon: Shield, text: "Secure & Scalable" },
            { icon: Zap, text: "Fast Delivery" },
            { icon: Sparkles, text: "Latest Technology" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              animate={
                isInView
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.3,
              }}
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
