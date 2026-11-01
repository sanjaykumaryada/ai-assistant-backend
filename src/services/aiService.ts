import { gemini } from "../config/gemini.js";
import type { Content } from "@google/genai";

export async function generateAiResponseService(contents: Content[]) {
  const response = await gemini.models.generateContent({
    model: "gemini-3.6-flash",
    contents,
  });
  //   console.log({ response });
  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return response.text;
}
