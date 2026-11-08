export interface CreateDocumentInput {
    ownerId: string;
    filename: string;
    originalName: string;
    filepath: string;
    mimeType: string;
    size: number;
}
export declare function createDocumentService(input: CreateDocumentInput): Promise<{
    document: import("mongoose").Document<unknown, {}, import("../models/Document.js").IDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Document.js").IDocument & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    };
    processingResult: {
        chunks: string[];
        extractedText: string;
        embeddings: number[][];
        totalChunks: number;
    };
}>;
//# sourceMappingURL=documentService.d.ts.map