import { generateEmbedding } from "./embeddingService.js";

export async function queryEmbeddingService(query: string) {
  const embeddings = await generateEmbedding([query]);
  const embedding = embeddings[0];

  if (!embedding) {
    throw new Error("Failed to generate query embedding");
  }
  return embedding;
}
