import "dotenv/config";
import { queryEmbeddingService } from "./services/queryEmbeddingService.js";

async function testQueryEmbedding() {
  const query = "How does Node.js execute JavaScript?";

  const embedding = await queryEmbeddingService(query);

  console.log("Embedding dimensions:", embedding?.length);
  console.log("First five values:", embedding?.slice(0, 5));
}

testQueryEmbedding();
