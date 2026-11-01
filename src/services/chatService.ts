import mongoose from "mongoose";
import { generateAiResponseService } from "./aiService.js";
import {
  createMessageService,
  getConversationContextService,
  createAssistantMessageService,
} from "./messageService.js";
import { ROLE_ENUM } from "../models/MessegeModel.js";
import { generateEmbedding } from "./embeddingService.js";
import { queryEmbeddingService } from "./queryEmbeddingService.js";
import { retrieveRelevantChunks } from "./retrievalService.js";
import { buildContext } from "./contextBuilderService.js";

interface SendMessageInput {
  conversationId: string;
  ownerId: string;
  content: string;
}

export async function sendMessageService(input: SendMessageInput) {
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

  // 2. Generate embedding for the current question
  const queryEmbedding = await queryEmbeddingService(
    userMessage.message.content,
  );

  // 3. Retrieve relevant document chunks
  const retrievedResults = await retrieveRelevantChunks({
    queryEmbedding,
    ownerId: input.ownerId,
    limit: 3,
  });

  // 4. Build context from retrieved chunks
  const documentContext = buildContext({
    documents: retrievedResults.documents,
  });

  // 5. Retrieve conversation history
  const conversationContext = await getConversationContextService(
    input.conversationId,
    input.ownerId,
  );

  if (conversationContext.kind !== "success") {
    return conversationContext;
  }

  // 6. Convert conversation history into Gemini format
  const contents = conversationContext.messages.map((message) => ({
    role: message.role === ROLE_ENUM.ASSISTANT ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  // 7. Add retrieved document context to the current user message
  const lastUserMessage = contents[contents.length - 1];
  if (lastUserMessage?.role === "user" && lastUserMessage.parts[0]) {
    lastUserMessage.parts[0].text = `Use the following retrieved document context to answer the question.
      If the context does not contain the answer, say that you don't have enough information.
      
      Retrieved context:
      ${documentContext}
      
      User question:
      ${userMessage.message.content}`;
  }

  // 8. Generate Gemini response
  const answer = await generateAiResponseService(contents);

  // 9. Save assistant response
  const assistantMessage = await createAssistantMessageService(
    input.conversationId,
    answer,
  );

  return {
    kind: "user-message-created" as const,
    userMessage: userMessage.message,
    assistantMessage,
  };
}
