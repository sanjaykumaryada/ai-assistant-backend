import { getEncoding } from "js-tiktoken";

const CHUNK_SIZE = 700;
const CHUNK_OVERLAP = 100;

const encoding = getEncoding("cl100k_base");

export function chunkText(text: string): string[] {
  const tokens = encoding.encode(text);
  const chunks: string[] = [];
  const stepSize = CHUNK_SIZE - CHUNK_OVERLAP;
  for (let start = 0; start < tokens.length; start += stepSize) {
    const end = Math.min(start + CHUNK_SIZE, tokens.length);
    const chunksTokens = tokens.slice(start, end);
    const chunkText = encoding.decode(chunksTokens);
    if (chunkText.trim()) {
      chunks.push(chunkText);
    }
  }
  return chunks;
}
