import { searchDocuments } from "./implementations/searchDocuments.js";

interface ExecuteToolInput {
  name: string;
  args: Record<string, unknown>;
  ownerId: string;
}

export async function executeTool({ name, args, ownerId }: ExecuteToolInput) {
  switch (name) {
    case "search_documents": {
      const query = args.query;

      if (typeof query !== "string" || !query.trim()) {
        throw new Error("Invalid search query");
      }

      return await searchDocuments({
        query,
        ownerId,
      });
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
