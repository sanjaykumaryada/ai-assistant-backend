export function cleanExtractedText(text: string): string {
  return text
    .replace(/\r\n/g, "\n") // Normalize line endings
    .replace(/[ \t]+/g, " ") // Remove repeated spaces and tabs
    .replace(/\n{3,}/g, "\n\n") // Limit excessive blank lines
    .trim();
}
