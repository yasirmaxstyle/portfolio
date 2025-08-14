"use client"

import { useEffect } from "react"
import { KEYBOARD_SHORTCUTS } from "@/constants/keyboard-shortcuts"

interface UseKeyboardShortcutsProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  onCloseTab: () => void
  onEscape: () => void
  isMobile: boolean
}

export function useKeyboardShortcuts({
  sidebarOpen,
  onToggleSidebar,
  onCloseTab,
  onEscape,
  isMobile,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (KEYBOARD_SHORTCUTS.TOGGLE_SIDEBAR.includes(e.key)) {
          e.preventDefault()
          onToggleSidebar()
        } else if (e.key === KEYBOARD_SHORTCUTS.CLOSE_TAB) {
          e.preventDefault()
          onCloseTab()
        }
      }

      if (e.key === KEYBOARD_SHORTCUTS.ESCAPE && isMobile && sidebarOpen) {
        onEscape()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sidebarOpen, isMobile, onToggleSidebar, onCloseTab, onEscape])
}
