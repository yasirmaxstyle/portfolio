import { FileCode, Database, Settings, Container, Code, type LucideIcon } from "lucide-react"

export interface FileType {
  icon: LucideIcon
  language: string
  extensions: string[]
}

export const FILE_TYPES: Record<string, FileType> = {
  typescript: {
    icon: FileCode,
    language: "typescript",
    extensions: [".ts", ".tsx"],
  },
  go: {
    icon: Code,
    language: "go",
    extensions: [".go"],
  },
  sql: {
    icon: Database,
    language: "sql",
    extensions: [".sql"],
  },
  dockerfile: {
    icon: Container,
    language: "dockerfile",
    extensions: [".dockerfile"],
  },
  yaml: {
    icon: Settings,
    language: "yaml",
    extensions: [".yml", ".yaml"],
  },
  json: {
    icon: Settings,
    language: "json",
    extensions: [".json"],
  },
  markdown: {
    icon: FileCode,
    language: "markdown",
    extensions: [".md"],
  },
}

export const getFileType = (filename: string): FileType => {
  for (const fileType of Object.values(FILE_TYPES)) {
    if (fileType.extensions.some((ext) => filename.endsWith(ext))) {
      return fileType
    }
  }
  return FILE_TYPES.typescript // default
}
