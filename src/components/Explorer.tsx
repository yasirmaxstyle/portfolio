"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Database,
  Settings,
  Code,
  FileCode,
  Container,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"

interface ExplorerProps {
  activeFile: string | null
  onFileSelect: (file: string) => void
  onMobileClose?: () => void
}

interface FileItem {
  name: string
  type: "file" | "folder"
  icon: React.ComponentType<{ className?: string }>
  children?: FileItem[]
  path: string
}

const fileStructure: FileItem[] = [
  {
    name: "intro.ts",
    type: "file",
    icon: FileCode,
    path: "intro.ts",
  },
  {
    name: "about.go",
    type: "file",
    icon: Code,
    path: "about.go",
  },
  {
    name: "stack.yaml",
    type: "file",
    icon: Settings,
    path: "stack.yaml",
  },
  {
    name: "projects",
    type: "folder",
    icon: Folder,
    path: "projects",
    children: [
      {
        name: "noir",
        type: "folder",
        icon: Folder,
        path: "projects/noir",
        children: [
          { name: "README.md", type: "file", icon: FileText, path: "projects/noir/README.md" },
        ],
      },
    ],
  },
  {
    name: "life.dockerfile",
    type: "file",
    icon: Container,
    path: "life.dockerfile",
  },
  {
    name: "life.compose.yml",
    type: "file",
    icon: Settings,
    path: "life.compose.yml",
  },
  {
    name: "stats.sql",
    type: "file",
    icon: Database,
    path: "stats.sql",
  },
  {
    name: "contact.json",
    type: "file",
    icon: FileCode,
    path: "contact.json",
  },
]

export function Explorer({ activeFile, onFileSelect, onMobileClose }: Readonly<ExplorerProps>) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["projects"]))
  const { theme, toggleTheme } = useTheme()

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const handleFileClick = (path: string) => {
    onFileSelect(path)
    onMobileClose?.()
  }

  const renderFileItem = (item: FileItem, depth = 0) => {
    const isExpanded = expandedFolders.has(item.path)
    const isActive = activeFile === item.path
    const Icon = (() => {
      if (item.type === "folder") return isExpanded ? FolderOpen : Folder
      return item.icon
    })()

    return (
      <div key={item.path}>
        <motion.div
          whileHover={{ backgroundColor: "hsl(var(--accent))" }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center gap-1 py-2 px-2 cursor-pointer text-sm transition-colors min-h-[32px]",
            isActive && "bg-accent text-accent-foreground",
            !isActive && "text-sidebar-foreground hover:text-sidebar-accent-foreground",
          )}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.path)
            } else {
              handleFileClick(item.path)
            }
          }}
        >
          {item.type === "folder" && (
            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
              <ChevronRight className="h-3 w-3" />
            </motion.div>
          )}
          {item.type === "file" && <div className="w-3" />}
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.1 }}>
            <Icon className="h-4 w-4 flex-shrink-0" />
          </motion.div>
          <span className="truncate">{item.name}</span>
        </motion.div>

        <AnimatePresence>
          {item.type === "folder" && isExpanded && item.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {item.children.map((child) => renderFileItem(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col bg-sidebar"
    >
      <div className="p-3 text-xs font-semibold text-sidebar-foreground uppercase tracking-wide border-b border-sidebar-border flex items-center justify-between">
        <span>Explorer</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          onClick={toggleTheme}
        >
          <motion.div
            animate={{ rotate: theme === "dark" ? 0 : 180 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.div>
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">{fileStructure.map((item) => renderFileItem(item))}</div>
      </div>
    </motion.div>
  )
}
