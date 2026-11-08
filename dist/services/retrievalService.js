import { getDocumentCollection } from "./vectorStoreService.js";
export async function retrieveRelevantChunks({ queryEmbedding, ownerId, limit = 3, }) {
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
//# sourceMappingURL=retrievalService.js.map