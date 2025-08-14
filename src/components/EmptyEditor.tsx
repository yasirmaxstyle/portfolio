"use client"

import { motion } from "framer-motion"
import { FileCode } from "lucide-react"

export function EmptyEditor() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex items-center justify-center bg-background text-muted-foreground"
    >
      <div className="text-center">
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <FileCode className="h-16 w-16 mx-auto mb-4" />
        </motion.div>
        <p className="text-lg">Select a file to see what happens with my life</p>
        <p className="text-sm mt-2 hidden sm:block">Choose from the explorer on the left</p>
        <p className="text-sm mt-2 sm:hidden">Tap the menu to open explorer</p>
      </div>
    </motion.div>
  )
}
