import { queryEmbeddingService } from "../../services/queryEmbeddingService.js";
import { retrieveRelevantChunks } from "../../services/retrievalService.js";
import { buildContext } from "../../services/contextBuilderService.js";
export async function searchDocuments({ query, ownerId, }) {
    // 1. Generate query embedding
    const queryEmbedding = await queryEmbeddingService(query);
    // 2. Retrieve relevant chunks
    const results = await retrieveRelevantChunks({
        queryEmbedding,
        ownerId,
        limit: 3,
    });
    // 3. Build readable context
    const context = buildContext({
        documents: results.documents,
    });
    return context;
}
//# sourceMappingURL=searchDocuments.js.map