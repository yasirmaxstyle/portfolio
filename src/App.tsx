import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Explorer } from "@/components/Explorer"
import { FileView } from "@/components/FileView"
import { StatusBar } from "@/components/StatusBar"
import { TitleBar } from "@/components/TitleBar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useTouchGestures } from "@/hooks/use-touch-gestures"
import { UI_CONSTANTS } from "@/constants/ui-constants"

export default function VSCodePortfolio() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [openTabs, setOpenTabs] = useState<string[]>(["intro.ts"])
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const isMobile = useMediaQuery(`(max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px)`)
  const isTablet = useMediaQuery(`(max-width: ${UI_CONSTANTS.BREAKPOINTS.TABLET}px)`)

  const activeFile = openTabs[activeTabIndex] || null

  const handleFileSelect = (filename: string) => {
    setOpenTabs((prev) => {
      const existingIndex = prev.indexOf(filename)

      if (existingIndex !== -1) {
        setActiveTabIndex(existingIndex)
        return prev
      }

      // NEW TABS
      const newTabs = [...prev, filename]
      setActiveTabIndex(newTabs.length - 1)
      return newTabs
    })

    if (isMobile) setSidebarOpen(false)
  }

  const handleCloseTab = (index: number) => {
    const newTabs = openTabs.filter((_, i) => i !== index)
    setOpenTabs(newTabs)

    if (newTabs.length === 0) {
      setActiveTabIndex(-1)
    } else if (index <= activeTabIndex) {
      setActiveTabIndex(Math.max(0, activeTabIndex - 1))
    }
  }

  const handleCloseActiveTab = () => {
    if (openTabs.length > 0) {
      handleCloseTab(activeTabIndex)
    }
  }

  useKeyboardShortcuts({
    sidebarOpen,
    onToggleSidebar: () => setSidebarOpen(!sidebarOpen),
    onCloseTab: handleCloseActiveTab,
    onEscape: () => setSidebarOpen(false),
    isMobile,
  })

  useTouchGestures({
    isMobile,
    sidebarOpen,
    onOpenSidebar: () => setSidebarOpen(true),
    onCloseSidebar: () => setSidebarOpen(false),
  })

  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  const getSidebarWidth = () => {
    if (isMobile) return UI_CONSTANTS.SIDEBAR_WIDTH.MOBILE
    if (isTablet) return UI_CONSTANTS.SIDEBAR_WIDTH.TABLET
    return UI_CONSTANTS.SIDEBAR_WIDTH.DESKTOP
  }

  return (
    <ThemeProvider>
      <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
        <TitleBar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Mobile Overlay */}
          <AnimatePresence>
            {isMobile && sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: UI_CONSTANTS.ANIMATION_DURATION.FAST }}
                className="absolute inset-0 bg-black/50 z-10 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                  x: isMobile ? -getSidebarWidth() : 0,
                }}
                animate={{
                  width: getSidebarWidth(),
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  width: 0,
                  opacity: 0,
                  x: isMobile ? -getSidebarWidth() : 0,
                }}
                transition={{
                  duration: UI_CONSTANTS.ANIMATION_DURATION.NORMAL,
                  ease: "easeInOut",
                }}
                className={`bg-sidebar border-r border-border overflow-hidden z-20 ${isMobile ? "absolute h-full" : "relative"
                  }`}
              >
                <Explorer
                  activeFile={activeFile}
                  onFileSelect={handleFileSelect}
                  onMobileClose={() => isMobile && setSidebarOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <FileView
              openTabs={openTabs}
              activeTabIndex={activeTabIndex}
              onTabSelect={setActiveTabIndex}
              onTabClose={handleCloseTab}
            />
          </div>
        </div>

        {/* Status Bar */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: UI_CONSTANTS.ANIMATION_DURATION.NORMAL, delay: 0.1 }}
        >
          <StatusBar />
        </motion.div>
      </div>
    </ThemeProvider>
  )
}
