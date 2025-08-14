"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UI_CONSTANTS } from "@/constants/ui-constants"

interface TitleBarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  isMobile: boolean
}

export function TitleBar({ sidebarOpen, onToggleSidebar }: Readonly<TitleBarProps>) {
  return (
    <motion.div
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: UI_CONSTANTS.ANIMATION_DURATION.NORMAL }}
      className="h-8 bg-[#323233] dark:bg-[#323233] flex items-center justify-between px-2 text-xs"
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer"
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer"
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-3 h-3 rounded-full bg-[#28ca42] cursor-pointer"
          />
        </div>
        <span className="text-muted-foreground hidden sm:inline">Yasirmaxstyle - Portfolio</span>
        <span className="text-muted-foreground sm:hidden">Portfolio</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden h-6 w-6 p-0 text-muted-foreground hover:bg-accent transition-colors"
        onClick={onToggleSidebar}
      >
        <motion.div
          animate={{ rotate: sidebarOpen ? 180 : 0 }}
          transition={{ duration: UI_CONSTANTS.ANIMATION_DURATION.FAST }}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </motion.div>
      </Button>
    </motion.div>
  )
}