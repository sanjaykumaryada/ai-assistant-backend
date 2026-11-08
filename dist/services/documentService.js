import DocumentModel from "../models/Document.js";
import { documentProcessingService } from "./documentProcessingService.js";
import { storeDocumentChunks } from "./vectorStoreService.js";
export async function createDocumentService(input) {
    const document = await DocumentModel.create({
        ownerId: input.ownerId,
        filename: input.filename,
        filepath: input.filepath,
        mimeType: input.mimeType,
        originalName: input.originalName,
        size: input.size,
        status: "uploaded",
    });
    await DocumentModel.findByIdAndUpdate(document._id, {
        status: "processing",
    });
    try {
        const processingResult = await documentProcessingService(input.filepath);
        await storeDocumentChunks({
            documentId: document._id.toString(),
            ownerId: input.ownerId.toString(),
            chunks: processingResult.chunks,
            embeddings: processingResult.embeddings,
        });
        await DocumentModel.findByIdAndUpdate(document._id, {
            status: "completed",
        });
        return {
            document,
            processingResult,
        };
    }
    catch (error) {
        await DocumentModel.findByIdAndUpdate(document._id, {
            status: "failed",
        });
        throw error;
    }
}
//# sourceMappingURL=documentService.js.map