"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFileType } from "@/constants/file-types"
import { UI_CONSTANTS } from "@/constants/ui-constants"

interface TabBarProps {
  openTabs: string[]
  activeTabIndex: number
  onTabSelect: (index: number) => void
  onTabClose: (index: number) => void
}

export function TabBar({ openTabs, activeTabIndex, onTabSelect, onTabClose }: Readonly<TabBarProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: UI_CONSTANTS.ANIMATION_DURATION.FAST }}
      className="h-9 bg-muted/30 border-b border-border flex items-center overflow-x-auto scrollbar-hide"
    >
      <div className="flex min-w-max">
        {openTabs.map((filename, index) => {
          const fileType = getFileType(filename)
          const Icon = fileType.icon
          const isActive = index === activeTabIndex

          return (
            <motion.div
              key={filename}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: UI_CONSTANTS.ANIMATION_DURATION.FAST }}
              className={`flex items-center gap-2 px-3 py-1 text-sm border-r border-border cursor-pointer group min-w-0 max-w-48
                ${isActive
                  ? "bg-background text-foreground"
                  : "bg-muted/20 text-muted-foreground hover:bg-muted/40"
                }`}
              onClick={() => onTabSelect(index)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate flex-1">{filename}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 transition-all"
                onClick={(e) => {
                  e.stopPropagation()
                  onTabClose(index)
                }}
              >
                <X />
              </Button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
