interface BuildContextInput {
  documents: (string | null)[][];
}
export function buildContext({ documents }: BuildContextInput) {
  const chunks = documents
    .flat()
    .filter((document): document is string => document !== null);
  return chunks
    .map((chunk, index) => `Context ${index + 1}:\n${chunk}`)
    .join("\n\n");
}
