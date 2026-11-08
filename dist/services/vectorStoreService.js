import { chroma } from "../config/chroma.js";
export async function getDocumentCollection() {
    const collection = await chroma.getOrCreateCollection({
        name: "document_chunks",
        metadata: {
            description: "Stores document chunks and their embeddings",
        },
    });
    return collection;
}
export async function storeDocumentChunks(input) {
    if (input.chunks.length !== input.embeddings.length) {
        throw new Error("chunks and embedding count do not match");
    }
    if (input.chunks.length === 0)
        return;
    const collection = await getDocumentCollection();
    const ids = input.chunks.map((_, index) => `${input.documentId}_chunk_${index}`);
    const metadatas = input.chunks.map((_, index) => ({
        documentId: input.documentId,
        ownerId: input.ownerId,
        chunkIndex: index,
    }));
    collection.add({
        ids,
        documents: input.chunks,
        embeddings: input.embeddings,
        metadatas,
    });
}
//# sourceMappingURL=vectorStoreService.js.map