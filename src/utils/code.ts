export function normalizeCode(code: string) {
  const lines = code.split("\n");

  // Remove leading/trailing empty lines
  while (lines.length && lines[0].trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

  // Remove common leading indentation
  const minIndent = Math.min(
    ...lines
      .filter(Boolean)
      .map(line => {
        const match = /^ */.exec(line);
        return match ? match[0].length : 0;
      })
  );

  return lines.map(line => line.slice(minIndent)).join("\n");
}