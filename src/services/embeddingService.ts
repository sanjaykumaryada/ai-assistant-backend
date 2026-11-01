import { gemini } from "../config/gemini.js";

export async function generateEmbedding(texts: string[]) {
  if (texts.length === 0) return [];
  const response = await gemini.models.embedContent({
    model: "gemini-embedding-001",
    contents: texts,
    config: {
      outputDimensionality: 768,
    },
  });

  const embeddings = response.embeddings?.map((item) => item.values);

  if (!embeddings || embeddings.length !== texts.length) {
    throw new Error("Failed to generate embeddings for all chunks");
  }

  const validEmbeddings: number[][] = [];

  for (const embedding of embeddings) {
    if (!embedding) {
      throw new Error("Embedding values are missing");
    }

    validEmbeddings.push(embedding);
  }

  return validEmbeddings;
}
// gemini-embedding-2
