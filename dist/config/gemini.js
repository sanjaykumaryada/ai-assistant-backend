import { GoogleGenAI } from "@google/genai";
// console.log({ env: process.env });
const api_key = process.env.GEMINI_API_KEY;
if (!api_key) {
    throw new Error("LLM api key is missing");
}
export const gemini = new GoogleGenAI({ apiKey: api_key });
//# sourceMappingURL=gemini.js.map