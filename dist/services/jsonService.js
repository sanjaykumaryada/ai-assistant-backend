import fs from "node:fs/promises";
import { cleanExtractedText } from "./textCleaningService.js";
export async function extractJsonText(filePath) {
    const fileContent = await fs.readFile(filePath, "utf-8");
    // Validate and parse the JSON
    const parsedData = JSON.parse(fileContent);
    // Convert the parsed JSON structure back into readable text
    const extractedText = cleanExtractedText(JSON.stringify(parsedData, null, 2));
    if (!extractedText) {
        throw new Error("No readable content found in JSON file");
    }
    return extractedText;
}
//# sourceMappingURL=jsonService.js.map