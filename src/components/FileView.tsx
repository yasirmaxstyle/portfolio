"use client"

import { motion, AnimatePresence } from "framer-motion"
import { getFileContent } from "./FileUtils"
import { SyntaxHighlighter } from "./SyntaxHighlighter"
import { TabBar } from "./TabBar"
import { EmptyEditor } from "./EmptyEditor"
import { getFileType } from "@/constants/file-types"
import { UI_CONSTANTS } from "@/constants/ui-constants"

interface FileViewProps {
  openTabs: string[]
  activeTabIndex: number
  onTabSelect: (index: number) => void
  onTabClose: (index: number) => void
}

export function FileView({ openTabs, activeTabIndex, onTabSelect, onTabClose }: Readonly<FileViewProps>) {
  const activeFile = openTabs[activeTabIndex]

  if (openTabs.length === 0) {
    return <EmptyEditor />
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      <TabBar openTabs={openTabs} activeTabIndex={activeTabIndex} onTabSelect={onTabSelect} onTabClose={onTabClose} />

      {/* Editor Content */}
      <AnimatePresence mode="wait">
        {activeFile && (
          <motion.div
            key={activeFile}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: UI_CONSTANTS.ANIMATION_DURATION.NORMAL, ease: "easeOut" }}
            className="flex-1 overflow-auto"
          >
            <SyntaxHighlighter
              code={getFileContent(activeFile)}
              language={getFileType(activeFile).language}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
