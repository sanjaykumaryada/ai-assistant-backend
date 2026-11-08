interface RetrieveChunksInput {
    queryEmbedding: number[];
    ownerId: string;
    limit?: number;
}
export declare function retrieveRelevantChunks({ queryEmbedding, ownerId, limit, }: RetrieveChunksInput): Promise<import("chromadb").QueryResult<import("chromadb").Metadata>>;
export {};
//# sourceMappingURL=retrievalService.d.ts.map