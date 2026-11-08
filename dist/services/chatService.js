import mongoose from "mongoose";
import { generateAiResponseWithToolsService } from "./aiService.js";
import { createMessageService, getConversationContextService, createAssistantMessageService, } from "./messageService.js";
import { ROLE_ENUM } from "../models/MessegeModel.js";
import { queryEmbeddingService } from "./queryEmbeddingService.js";
import { retrieveRelevantChunks } from "./retrievalService.js";
import { buildContext } from "./contextBuilderService.js";
import { searchDocumentsTool } from "../tools/toolDefinitions.js";
import { executeTool } from "../tools/toolExecutor.js";
export async function sendMessageService(input) {
    // 1. Save the user's message
    const userMessage = await createMessageService({
        conversationId: new mongoose.Types.ObjectId(input.conversationId),
        ownerId: input.ownerId,
        content: input.content,
        role: ROLE_ENUM.USER,
    });
    if (userMessage.kind !== "created") {
        throw new Error("Failed to create user message");
    }
    // 2. Generate query embedding
    const queryEmbedding = await queryEmbeddingService(userMessage.message.content);
    // 3. Retrieve relevant document chunks
    const retrievedResults = await retrieveRelevantChunks({
        queryEmbedding,
        ownerId: input.ownerId,
        limit: 3,
    });
    // 4. Build document context
    const documentContext = buildContext({
        documents: retrievedResults.documents,
    });
    // 5. Retrieve conversation history
    const conversationContext = await getConversationContextService(input.conversationId, input.ownerId);
    if (conversationContext.kind !== "success") {
        return conversationContext;
    }
    // 6. Convert conversation history into Gemini format
    const contents = conversationContext.messages.map((message) => ({
        role: message.role === ROLE_ENUM.ASSISTANT ? "model" : "user",
        parts: [{ text: message.content }],
    }));
    // 7. Add retrieved context to the current user message
    const lastUserMessage = contents[contents.length - 1];
    if (lastUserMessage?.role === "user" && lastUserMessage.parts[0]) {
        lastUserMessage.parts[0].text = `
Use the following retrieved document context to answer the question.
If the context does not contain the answer, say that you don't have enough information.

Retrieved context:
${documentContext}

User question:
${userMessage.message.content}
`;
    }
    // 8. Ask Gemini, with the available tool declaration
    const response = await generateAiResponseWithToolsService(contents, [
        searchDocumentsTool,
    ]);
    let answer;
    // 9. Check whether Gemini requested a tool
    if (response.functionCalls?.length) {
        const toolResults = [];
        // 10. Execute every requested tool
        for (const functionCall of response.functionCalls) {
            if (!functionCall.name) {
                throw new Error("Gemini returned a function call without a name");
            }
            const result = await executeTool({
                name: functionCall.name,
                args: functionCall.args ?? {},
                ownerId: input.ownerId,
            });
            toolResults.push({
                name: functionCall.name,
                result,
            });
        }
        // 11. Build function response parts
        const functionResponseParts = toolResults.map((tool) => ({
            functionResponse: {
                name: tool.name,
                response: {
                    result: tool.result,
                },
            },
        }));
        // 12. Preserve Gemini's original function-call response
        const modelParts = response.candidates?.[0]?.content?.parts;
        if (!modelParts) {
            throw new Error("Gemini function-call response parts are missing");
        }
        // 13. Send function results back to Gemini
        const followUpContents = [
            ...contents,
            {
                role: "model",
                parts: modelParts,
            },
            {
                role: "user",
                parts: functionResponseParts,
            },
        ];
        // 14. Gemini generates the final answer
        const finalResponse = await generateAiResponseWithToolsService(followUpContents, [searchDocumentsTool]);
        if (!finalResponse.text) {
            throw new Error("Gemini did not return a final text response");
        }
        answer = finalResponse.text;
    }
    else {
        // Gemini returned a normal text response without requesting a tool
        if (!response.text) {
            throw new Error("Gemini returned an empty response");
        }
        answer = response.text;
    }
    // 15. Save assistant response in MongoDB
    const assistantMessage = await createAssistantMessageService(input.conversationId, answer);
    return {
        kind: "user-message-created",
        userMessage: userMessage.message,
        assistantMessage,
    };
}
//# sourceMappingURL=chatService.js.map