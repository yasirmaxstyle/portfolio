"use client"

import { useEffect } from "react"
import { UI_CONSTANTS } from "../constants/ui-constants"

interface UseTouchGesturesProps {
  isMobile: boolean
  sidebarOpen: boolean
  onOpenSidebar: () => void
  onCloseSidebar: () => void
}

export function useTouchGestures({ isMobile, sidebarOpen, onOpenSidebar, onCloseSidebar }: UseTouchGesturesProps) {
  useEffect(() => {
    if (!isMobile) return

    let startX = 0
    let startY = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = endX - startX
      const diffY = endY - startY

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > UI_CONSTANTS.TOUCH_THRESHOLD) {
        if (diffX > 0 && startX < UI_CONSTANTS.TOUCH_THRESHOLD) {
          onOpenSidebar()
        } else if (diffX < 0 && sidebarOpen) {
          onCloseSidebar()
        }
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isMobile, sidebarOpen, onOpenSidebar, onCloseSidebar])
}
