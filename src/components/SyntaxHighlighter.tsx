"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { normalizeCode } from "@/utils/code"
import { highlightCode } from "@/utils/highlight"
import { useTheme } from "./ThemeProvider"

interface SyntaxHighlighterProps {
  code: string
  language: string
}

export function SyntaxHighlighter({ code, language}: Readonly<SyntaxHighlighterProps>) {
  const [highlightedCode, setHighlightedCode] = useState("")
  const { theme } = useTheme()

  useEffect(() => {
    let isMounted = true
    const normalized = normalizeCode(code)

    highlightCode(normalized, language, theme).then(html => {
      if (isMounted) setHighlightedCode(html)
    })

    return () => {
      isMounted = false
    }
  }, [code, language, theme])

  // Split HTML into lines for line numbers
  const lines = highlightedCode.split("\n")

  return (
    <div className="h-full overflow-auto font-mono text-sm">
      <div className="flex">
        {/* Line Numbers */}
        <div className="bg-muted/20 text-muted-foreground text-xs py-4 px-2 select-none border-r border-border">
          {lines.map((line, idx) => (
            <div key={line + idx} className="h-5 flex items-center justify-end pr-2 min-w-[2rem]">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Code Content with Animated Lines */}
        <div className="flex-1 py-4 px-4 overflow-auto relative whitespace-pre">
          {lines.map((line, index) => {
            const isLast = index === lines.length - 1
            return (
              <motion.div
                key={line + index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: index * 0.03 }}
                className="h-5 leading-5 flex items-center"
              >
                {/* Render code line */}
                <span dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />

                {/* Render blinking cursor on last line */}
                {isLast && (
                  <motion.span
                    className="ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    █
                  </motion.span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
