export const KEYBOARD_SHORTCUTS = {
  TOGGLE_SIDEBAR: ["b", "\\"] as string[],
  CLOSE_TAB: "w",
  ESCAPE: "Escape",
} as const

export type KeyboardShortcut = keyof typeof KEYBOARD_SHORTCUTS