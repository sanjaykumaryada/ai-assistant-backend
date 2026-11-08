import path from "node:path";
import { chunkText } from "./chunkingService.js";
import { extractPdfText } from "./pdfService.js";
import { extractJsonText } from "./jsonService.js";
import { extractMarkdownText } from "./markdownService.js";
import { generateEmbedding } from "./embeddingService.js";
export async function documentProcessingService(filepath) {
    const extension = path.extname(filepath).toLowerCase();
    let extractedText;
    switch (extension) {
        case ".pdf":
            extractedText = await extractPdfText(filepath);
            break;
        case ".json":
            extractedText = await extractJsonText(filepath);
        case ".md":
        case ".markdown":
            extractedText = await extractMarkdownText(filepath);
            break;
        default:
            throw new Error("unsupported document");
    }
    const chunks = await chunkText(extractedText);
    const embeddings = await generateEmbedding(chunks);
    return {
        chunks,
        extractedText,
        embeddings,
        totalChunks: chunks.length,
    };
}
//# sourceMappingURL=documentProcessingService.js.map