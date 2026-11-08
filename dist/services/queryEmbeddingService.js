import { generateEmbedding } from "./embeddingService.js";
export async function queryEmbeddingService(query) {
    const embeddings = await generateEmbedding([query]);
    const embedding = embeddings[0];
    if (!embedding) {
        throw new Error("Failed to generate query embedding");
    }
    return embedding;
}
//# sourceMappingURL=queryEmbeddingService.js.map