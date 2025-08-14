import {
  intro,
  about,
  stacks,
  dockerlife,
  compose,
  stats,
  contact,
  noirReadme
} from "@/data/index"

export const getFileContent = (filename: string) => {
  switch (filename) {
    case "intro.ts":
      return intro

    case "about.go":
      return about

    case "stack.yaml":
      return stacks

    case "life.dockerfile":
      return dockerlife

    case "life.compose.yml":
      return compose

    case "stats.sql":
      return stats

    case "contact.json":
      return contact

    case "projects/noir/README.md":
      return noirReadme

    default:
      return `// File: ${filename}
// Content will be loaded here...`
  }
}
