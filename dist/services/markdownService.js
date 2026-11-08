import fs from "node:fs/promises";
import { cleanExtractedText } from "./textCleaningService.js";
export async function extractMarkdownText(filePath) {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const extractedText = cleanExtractedText(fileContent);
    if (!extractedText) {
        throw new Error("No readable text found in Markdown file");
    }
    return extractedText;
}
//# sourceMappingURL=markdownService.js.map