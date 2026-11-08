import { PDFParse } from "pdf-parse";
import fs from "node:fs/promises";
import { cleanExtractedText } from "./textCleaningService.js";
export async function extractPdfText(filepath) {
    const fileBuffer = await fs.readFile(filepath);
    const pdfParsedData = await new PDFParse({ data: fileBuffer });
    try {
        const pdfData = await pdfParsedData.getText();
        const extractedText = cleanExtractedText(pdfData.text.trim());
        if (!extractedText) {
            throw new Error("No readable text found in pdf");
        }
        return extractedText;
    }
    finally {
        pdfParsedData.destroy();
    }
}
//# sourceMappingURL=pdfService.js.map