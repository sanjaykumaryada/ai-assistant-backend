import Conversation from "../models/Conversations.js";
import type { IMessage } from "../models/MessegeModel.js";
import mongoose from "mongoose";
import MessageModel, { ROLE_ENUM } from "../models/MessegeModel.js";

interface ICreateMessageInput extends IMessage {
  ownerId: string;
}

export async function createMessageService(messageInput: ICreateMessageInput) {
  const { content, conversationId, ownerId, role } = messageInput;

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    return { kind: "invalid-id" as const };
  }
  const conversation = await Conversation.findOne({
    _id: conversationId,
    ownerId,
  });
  if (!conversation) {
    return { kind: "not-found" as const };
  }

  const message = await MessageModel.create({
    conversationId: conversation!._id,
    content,
    role,
  });

  await Conversation.findByIdAndUpdate(conversation._id, {
    $set: { updatedAt: new Date() },
  });

  return {
    kind: "created" as const,
    message,
  };
}

export async function getMessageService(
  conversationId: string,
  ownerId: string,
  page: number,
  limit: number,
) {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    return { kind: "invalid-id" as const };
  }

  const conversation = await Conversation.findOne({
    ownerId,
    _id: conversationId,
  });
  if (!conversation) {
    return { kind: "not-found" as const };
  }

  const skip = (page - 1) * limit;
  const [messages, total] = await Promise.all([
    MessageModel.find({ conversationId })
      .sort({ createdAt: 1, _id: 1 })
      .skip(skip)
      .limit(limit),
    MessageModel.countDocuments({ conversationId }),
  ]);

  return {
    kind: "success" as const,
    messages,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function createAssistantMessageService(
  conversationId: string,
  content: string,
) {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error("Invalid conversation id");
  }

  const message = await MessageModel.create({
    conversationId: new mongoose.Types.ObjectId(conversationId),
    role: ROLE_ENUM.ASSISTANT,
    content,
  });
  await Conversation.findByIdAndUpdate(conversationId, {
    $set: { updatedAt: new Date() },
  });
  return message;
}

export async function getConversationContextService(
  conversationId: string,
  ownerId: string,
  limit: number = 20,
) {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    return { kind: "invalid-id" as const };
  }

  const conversation = await Conversation.findOne({
    ownerId,
    _id: conversationId,
  });
  if (!conversation) {
    return { kind: "not-found" as const };
  }
  const messages = await MessageModel.find({ conversationId })
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .lean();

  return {
    kind: "success" as const,
    conversation,
    messages: messages.reverse().map((message) => ({
      role: message.role,
      content: message.content,
    })),
  };
}
