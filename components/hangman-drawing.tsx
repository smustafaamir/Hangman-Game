"use client"

import { motion } from "framer-motion"

interface HangmanDrawingProps {
  wrongGuesses: number
}

export default function HangmanDrawing({ wrongGuesses }: HangmanDrawingProps) {
  return (
    <div className="relative w-full h-60">
      <svg viewBox="0 0 200 160" className="w-full h-full stroke-primary stroke-2 fill-none">
        {/* Base */}
        <motion.line
          x1="40"
          y1="150"
          x2="160"
          y2="150"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Vertical pole */}
        {wrongGuesses >= 1 && (
          <motion.line
            x1="60"
            y1="150"
            x2="60"
            y2="20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Horizontal pole */}
        {wrongGuesses >= 2 && (
          <motion.line
            x1="60"
            y1="20"
            x2="120"
            y2="20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Rope */}
        {wrongGuesses >= 3 && (
          <motion.line
            x1="120"
            y1="20"
            x2="120"
            y2="40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Head */}
        {wrongGuesses >= 4 && (
          <motion.circle
            cx="120"
            cy="50"
            r="10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Body */}
        {wrongGuesses >= 5 && (
          <motion.line
            x1="120"
            y1="60"
            x2="120"
            y2="100"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Arms */}
        {wrongGuesses >= 6 && (
          <>
            <motion.line
              x1="120"
              y1="75"
              x2="100"
              y2="65"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.line
              x1="120"
              y1="75"
              x2="140"
              y2="65"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </>
        )}
      </svg>
    </div>
  )
}

