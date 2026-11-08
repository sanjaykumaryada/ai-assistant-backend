export function buildContext({ documents }) {
    const chunks = documents
        .flat()
        .filter((document) => document !== null);
    return chunks
        .map((chunk, index) => `Context ${index + 1}:\n${chunk}`)
        .join("\n\n");
}
//# sourceMappingURL=contextBuilderService.js.map