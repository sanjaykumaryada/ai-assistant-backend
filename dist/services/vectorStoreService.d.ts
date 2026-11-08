export interface StoreDocumentChunksInput {
    documentId: string;
    ownerId: string;
    chunks: string[];
    embeddings: number[][];
}
export declare function getDocumentCollection(): Promise<import("chromadb").Collection>;
export declare function storeDocumentChunks(input: StoreDocumentChunksInput): Promise<void>;
//# sourceMappingURL=vectorStoreService.d.ts.map