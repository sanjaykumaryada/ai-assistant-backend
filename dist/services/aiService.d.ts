import type { Content, FunctionDeclaration } from "@google/genai";
export declare function generateAiResponseService(contents: Content[]): Promise<string>;
export declare function generateAiResponseWithToolsService(contents: Content[], functionDeclarations: FunctionDeclaration[]): Promise<import("@google/genai").GenerateContentResponse>;
//# sourceMappingURL=aiService.d.ts.map