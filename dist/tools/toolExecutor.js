import { searchDocuments } from "./implementations/searchDocuments.js";
export async function executeTool({ name, args, ownerId }) {
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
//# sourceMappingURL=toolExecutor.js.map