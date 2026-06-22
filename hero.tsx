"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-card">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0">
        <SentientSphere />
      </div>

      {/* Typography Overlay */}
      <motion.div style={{ opacity, scale }} className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 md:px-12 md:py-20">
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2 uppercase">01 — Skincare</p>
          <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance text-foreground">
            Radiant
            <br />
            <span className="italic">Skin</span>
          </h2>
        </motion.div>

        {/* Center Brand + Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6"
        >
          <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl lowercase tracking-tight text-foreground italic">
            nuibe
          </h1>
          <p className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground text-center max-w-xs text-balance">
            Cheerful energy that fills your daily life
          </p>
          <motion.button
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 border border-foreground/20 rounded-full font-mono text-xs tracking-[0.12em] uppercase bg-transparent backdrop-blur-sm text-foreground hover:bg-foreground hover:text-background transition-colors duration-500"
          >
            Discover
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-foreground rounded-full animate-pulse" />
          </motion.button>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="self-end text-right"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2 uppercase">02 — Inner Beauty</p>
          <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance text-foreground">
            Glow
            <br />
            <span className="italic">Within</span>
          </h2>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
