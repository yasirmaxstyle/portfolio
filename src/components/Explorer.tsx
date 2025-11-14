"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  Settings,
  Container,
  Database,
  Code,
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
  path: string
  children?: FileItem[]
}

const fileStructure: FileItem[] = [
  { name: "intro.ts", type: "file", icon: FileCode, path: "intro.ts" },
  { name: "about.go", type: "file", icon: Code, path: "about.go" },
  { name: "stack.yaml", type: "file", icon: Settings, path: "stack.yaml" },
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
          {
            name: "README.md",
            type: "file",
            icon: FileText,
            path: "projects/noir/README.md",
          },
        ],
      },
    ],
  },
  { name: "life.dockerfile", type: "file", icon: Container, path: "life.dockerfile" },
  { name: "life.compose.yml", type: "file", icon: Settings, path: "life.compose.yml" },
  { name: "stats.sql", type: "file", icon: Database, path: "stats.sql" },
  { name: "contact.json", type: "file", icon: FileCode, path: "contact.json" },
]

export function Explorer({ activeFile, onFileSelect, onMobileClose }: ExplorerProps) {
  const { theme, toggleTheme } = useTheme()
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["projects"]))

  /** ----------------------------------
   * Auto-expand folders that contain the active file (VSCode behavior)
   ------------------------------------ */
  useEffect(() => {
    if (!activeFile) return

    const foldersToExpand = new Set<string>()

    const check = (items: FileItem[]) => {
      for (const item of items) {
        if (item.type === "folder" && item.children) {
          // If a file inside matches → expand this folder
          if (contains(item.children, activeFile)) {
            foldersToExpand.add(item.path)
            check(item.children)
          }
        }
      }
    }

    const contains = (items: FileItem[], target: string): boolean => {
      for (const it of items) {
        if (it.type === "file" && it.path === target) return true
        if (it.type === "folder" && it.children && contains(it.children, target))
          return true
      }
      return false
    }

    check(fileStructure)
    setExpanded(foldersToExpand)
  }, [activeFile])

  const toggleFolder = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    })
  }

  const handleFileClick = (path: string) => {
    onFileSelect(path)
    onMobileClose?.()
  }

  /** ----------------------------------
   * Render file / folder item
   ------------------------------------ */
  const renderItem = (item: FileItem, depth = 0) => {
    const isFolder = item.type === "folder"
    const isOpen = expanded.has(item.path)
    const isActive = activeFile === item.path

    const Icon = isFolder
      ? isOpen
        ? FolderOpen
        : Folder
      : item.icon

    return (
      <div key={item.path}>
        <div
          className={cn(
            "flex items-center gap-1 py-1.5 px-2 cursor-pointer select-none text-sm transition-colors rounded-sm",
            isActive && "bg-accent text-accent-foreground",
            !isActive && "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
          style={{ paddingLeft: 8 + depth * 16 }}
          onClick={() => (isFolder ? toggleFolder(item.path) : handleFileClick(item.path))}
        >
          {isFolder ? (
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="mr-1">
              <ChevronRight className="h-3 w-3" />
            </motion.div>
          ) : (
            <div className="w-3" />
          )}

          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{item.name}</span>
        </div>

        {/* Folder children */}
        <AnimatePresence initial={false}>
          {isFolder && isOpen && item.children && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {item.children.map((child) => renderItem(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-sidebar">
      {/* Header */}
      <div className="p-3 text-xs font-semibold text-sidebar-foreground uppercase tracking-wide border-b border-sidebar-border flex items-center justify-between">
        <span>Explorer</span>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={toggleTheme}>
          <motion.div animate={{ rotate: theme === "dark" ? 0 : 180 }}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.div>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {fileStructure.map((item) => renderItem(item))}
      </div>
    </div>
  )
}