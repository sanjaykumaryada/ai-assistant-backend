import mongoose from "mongoose";
import { generateAiResponseService } from "./aiService.js";
import {
  createMessageService,
  getConversationContextService,
  createAssistantMessageService,
} from "./messageService.js";
import { ROLE_ENUM } from "../models/MessegeModel.js";

interface SendMessageInput {
  conversationId: string;
  ownerId: string;
  content: string;
}

export async function sendMessageService(input: SendMessageInput) {
  const userMessage = await createMessageService({
    conversationId: new mongoose.Types.ObjectId(input.conversationId),
    ownerId: input.ownerId,
    content: input.content,
    role: ROLE_ENUM.USER,
  });

  if (userMessage.kind !== "created") return userMessage;
  const context = await getConversationContextService(
    input.conversationId,
    input.ownerId,
  );
  if (context.kind !== "success") return context;
  const contents = context.messages.map((message) => ({
    role: message.role === ROLE_ENUM.ASSISTANT ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  const answer = await generateAiResponseService(contents);
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
