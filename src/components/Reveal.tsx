"use client";

import { motion } from 'framer-motion'
import React from 'react';

interface RevealProps {
    children: React.ReactNode;
    width?: string;
    delay?: number;
    overflow?: "hidden" | "visible";
    className?: string;
}

const RevealInner = ({ children, width = "fit-content", delay = 0.25, overflow = "hidden", className }: RevealProps) => {
    return (
        <div className={className} style={{ position: "relative", width, overflow }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                    duration: 0.5,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1]
                }}
                style={{ willChange: "transform, opacity", WebkitBackfaceVisibility: "hidden" }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export const Reveal = React.memo(RevealInner);
