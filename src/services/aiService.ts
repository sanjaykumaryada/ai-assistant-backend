import { gemini } from "../config/gemini.js";
import type { Content, FunctionDeclaration } from "@google/genai";

// Existing function — keep returning text
export async function generateAiResponseService(contents: Content[]) {
  const response = await gemini.models.generateContent({
    model: "gemini-3.6-flash",
    contents,
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return response.text;
}

// New function — supports tool declarations
export async function generateAiResponseWithToolsService(
  contents: Content[],
  functionDeclarations: FunctionDeclaration[],
) {
  const response = await gemini.models.generateContent({
    model: "gemini-3.6-flash",
    contents,
    config: {
      systemInstruction:
        "You are a document assistant. Whenever the user asks a question about their uploaded documents, you MUST call the search_documents tool before answering. Do not answer document questions directly.",
      tools: [
        {
          functionDeclarations,
        },
      ],
    },
  });

  if (!response.text && !response.functionCalls?.length) {
    throw new Error("Gemini returned an empty response");
  }

  return response;
}
