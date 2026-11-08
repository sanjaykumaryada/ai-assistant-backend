import { Type, type FunctionDeclaration } from "@google/genai";

export const searchDocumentsTool: FunctionDeclaration = {
  name: "search_documents",
  description:
    "Search the authenticated user's uploaded documents for relevant information",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description:
          "The question or topic to search for in uploaded documents.",
      },
    },
    required: ["query"],
  },
};
