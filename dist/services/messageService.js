import Conversation from "../models/Conversations.js";
import mongoose from "mongoose";
import MessageModel, { ROLE_ENUM } from "../models/MessegeModel.js";
export async function createMessageService(messageInput) {
    const { content, conversationId, ownerId, role } = messageInput;
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return { kind: "invalid-id" };
    }
    const conversation = await Conversation.findOne({
        _id: conversationId,
        ownerId,
    });
    if (!conversation) {
        return { kind: "not-found" };
    }
    const message = await MessageModel.create({
        conversationId: conversation._id,
        content,
        role,
    });
    await Conversation.findByIdAndUpdate(conversation._id, {
        $set: { updatedAt: new Date() },
    });
    return {
        kind: "created",
        message,
    };
}
export async function getMessageService(conversationId, ownerId, page, limit) {
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return { kind: "invalid-id" };
    }
    const conversation = await Conversation.findOne({
        ownerId,
        _id: conversationId,
    });
    if (!conversation) {
        return { kind: "not-found" };
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
        kind: "success",
        messages,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}
export async function createAssistantMessageService(conversationId, content) {
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
export async function getConversationContextService(conversationId, ownerId, limit = 20) {
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return { kind: "invalid-id" };
    }
    const conversation = await Conversation.findOne({
        ownerId,
        _id: conversationId,
    });
    if (!conversation) {
        return { kind: "not-found" };
    }
    const messages = await MessageModel.find({ conversationId })
        .sort({ createdAt: -1, _id: -1 })
        .limit(limit)
        .lean();
    return {
        kind: "success",
        conversation,
        messages: messages.reverse().map((message) => ({
            role: message.role,
            content: message.content,
        })),
    };
}
//# sourceMappingURL=messageService.js.map