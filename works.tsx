"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Plus } from "lucide-react"

type Product = {
  title: string
  price: string
  detail: string
  description: string
  image: string
}

type Category = {
  id: string
  name: string
  blurb: string
  products: Product[]
}

const categories: Category[] = [
  {
    id: "skincare",
    name: "Skincare",
    blurb: "Barrier-first formulas for a calm, luminous complexion.",
    products: [
      {
        title: "Radiance Serum",
        price: "$38",
        detail: "Niacinamide 15% · 30ml",
        description: "A weightless brightening serum that fades dark spots and evens tone over time.",
        image: "/products/radiance-serum.png",
      },
      {
        title: "Tone Up Cream",
        price: "$32",
        detail: "Niacinamide 5% · 50ml",
        description: "Daily moisturizer that leaves a soft, natural glow with a healthy finish.",
        image: "/products/tone-up-cream.png",
      },
      {
        title: "Barrier Cream",
        price: "$36",
        detail: "Ceramide Complex · 50ml",
        description: "Rich repair cream that strengthens the moisture barrier and soothes redness.",
        image: "/products/barrier-cream.png",
      },
      {
        title: "Collagen Glow Mask",
        price: "$9",
        detail: "Collagen 72 · Single",
        description: "A plumping sheet mask drenched in marine collagen for an instant bounce.",
        image: "/products/glow-mask.png",
      },
    ],
  },
  {
    id: "makeup",
    name: "Makeup",
    blurb: "Soft-focus essentials that let your skin breathe.",
    products: [
      {
        title: "Blurring Finish Powder",
        price: "$28",
        detail: "Soft Focus · 8g",
        description: "A breathable setting powder that blurs pores and keeps shine at bay all day.",
        image: "/products/finish-powder.png",
      },
    ],
  },
  {
    id: "inner-beauty",
    name: "Inner Beauty",
    blurb: "Quiet rituals for confidence that lingers.",
    products: [
      {
        title: "Solid Perfume",
        price: "$24",
        detail: "Fragrance · 12g",
        description: "A warm, low-key scent in a pocket-sized balm — close, comforting, and clean.",
        image: "/products/solid-perfume.png",
      },
    ],
  },
]

export function Works() {
  const [openId, setOpenId] = useState<string | null>(categories[0].id)
  const [hovered, setHovered] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  const hoveredImage = hovered
    ? categories.flatMap((c) => c.products).find((p) => p.title === hovered)
    : null

  return (
    <section id="collection" className="relative py-32 px-8 md:px-12 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20 md:mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">04 — The Catalogue</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic text-foreground">Browse by Category</h2>
      </motion.div>

      {/* Category Accordion */}
      <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
        {categories.map((category, index) => {
          const isOpen = openId === category.id
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border-t border-foreground/10"
            >
              {/* Category Header */}
              <button
                type="button"
                data-cursor-hover
                onClick={() => setOpenId(isOpen ? null : category.id)}
                className="group w-full flex items-center justify-between gap-4 py-8 md:py-10 text-left"
              >
                <div className="flex items-baseline gap-4 md:gap-6">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">
                    0{index + 1}
                  </span>
                  <motion.h3
                    className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground group-hover:text-foreground/50 transition-colors duration-300"
                    animate={{ x: isOpen ? 12 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {category.name}
                  </motion.h3>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                  <span className="hidden md:inline font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1 border border-foreground/20 rounded-full text-muted-foreground">
                    {category.products.length} {category.products.length === 1 ? "Item" : "Items"}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-foreground"
                  >
                    <Plus className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1} />
                  </motion.span>
                </div>
              </button>

              {/* Expandable Detail Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="font-mono text-xs tracking-[0.12em] uppercase text-muted-foreground mb-8 max-w-md text-balance">
                      {category.blurb}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 mb-12 md:mb-16 rounded-xl overflow-hidden border border-foreground/10">
                      {category.products.map((product, pIndex) => (
                        <motion.article
                          key={product.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 + pIndex * 0.08 }}
                          onMouseEnter={() => setHovered(product.title)}
                          onMouseLeave={() => setHovered(null)}
                          className="group bg-background p-6 md:p-8 flex flex-col gap-6"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
                                {String(pIndex + 1).padStart(2, "0")} — {product.detail}
                              </span>
                              <h4 className="font-sans text-2xl md:text-3xl font-light tracking-tight text-foreground mt-2">
                                {product.title}
                              </h4>
                            </div>
                            <span className="font-mono text-sm text-foreground tabular-nums shrink-0">
                              {product.price}
                            </span>
                          </div>

                          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

                          <a
                            href="#"
                            data-cursor-hover
                            className="mt-auto inline-flex w-fit font-mono text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-foreground/20 rounded-full text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                          >
                            Add to Bag
                          </a>
                        </motion.article>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Bottom Border */}
        <div className="border-t border-foreground/10" />

        {/* Floating Image (follows cursor on product hover) */}
        <motion.div
          className="absolute pointer-events-none z-50 w-56 h-36 md:w-72 md:h-44 overflow-hidden rounded-lg hidden md:block"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-120%",
          }}
          animate={{
            opacity: hoveredImage ? 1 : 0,
            scale: hoveredImage ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          {hoveredImage && (
            <motion.img
              src={hoveredImage.image || "/placeholder.svg"}
              alt={hoveredImage.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ filter: "saturate(1.02) contrast(1.02)" }}
            />
          )}
          <div className="absolute inset-0 bg-card/10 mix-blend-multiply" />
        </motion.div>
      </div>
    </section>
  )
}
