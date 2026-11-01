import { getDocumentCollection } from "./vectorStoreService.js";

interface RetrieveChunksInput {
  queryEmbedding: number[];
  ownerId: string;
  limit?: number;
}

export async function retrieveRelevantChunks({
  queryEmbedding,
  ownerId,
  limit = 3,
}: RetrieveChunksInput) {
  const collection = await getDocumentCollection();
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: limit,
    include: ["documents", "metadatas", "distances"],
    where: {
      ownerId,
    },
  });
  return results;
}
