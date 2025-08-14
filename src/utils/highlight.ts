import { createHighlighter } from "shiki";

export async function highlightCode(
  code: string,
  lang: string,
  theme: "light" | "dark"
) {
  const highlighter = await createHighlighter({
    themes: theme === "dark" ? ["github-dark-default"] : ["github-light-default"],
    langs: [lang],
  });

  return highlighter.codeToHtml(code, { lang, theme: theme === "dark" ? "github-dark-default" : "github-light-default" });
}
