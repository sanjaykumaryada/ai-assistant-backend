import { queryEmbeddingService } from "../../services/queryEmbeddingService.js";
import { retrieveRelevantChunks } from "../../services/retrievalService.js";
import { buildContext } from "../../services/contextBuilderService.js";

interface SearchDocumentsInput {
  query: string;
  ownerId: string;
}

export async function searchDocuments({
  query,
  ownerId,
}: SearchDocumentsInput) {
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
