"use client"

import { GitBranch, Zap, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function StatusBar() {
  return (
    <div className="h-6 bg-ansiBlue flex items-center justify-between px-3 text-xs text-white">
      <div className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 cursor-pointer">
          <GitBranch className="h-3 w-3" />
          <span className="hidden sm:inline">main</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 cursor-pointer">
          <CheckCircle className="h-3 w-3" />
          <span className="hidden md:inline">Portfolio Ready</span>
          <span className="md:hidden">Ready</span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 cursor-pointer">
          <Zap className="h-3 w-3" />
          <span className="hidden sm:inline">TypeScript</span>
          <span className="sm:hidden">TS</span>
        </motion.div>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden md:inline">LF</span>
        <span className="hidden lg:inline">Ln 1, Col 1</span>
      </div>
    </div>
  )
}
