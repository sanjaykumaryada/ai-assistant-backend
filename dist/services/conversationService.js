import Conversation, {} from "../models/Conversations.js";
export async function createConversationService(input) {
    const conversation = await Conversation.create({
        title: input.title,
        ownerId: input.ownerId,
    });
    return conversation;
}
export async function getAllConversationsService(ownerId) {
    const conversations = await Conversation.find({ ownerId }).sort({
        createdAt: -1,
    });
    return conversations;
}
export async function getASingleConversation(id, ownerId) {
    const conversation = await Conversation.findOne({ _id: id, ownerId });
    return conversation;
}
export async function updateConversationService(id, title, ownerId) {
    const conversation = await Conversation.findOneAndUpdate({ _id: id, ownerId }, { title }, { new: true, runValidators: true });
    return conversation;
}
export async function deleteConversationService(id, ownerId) {
    return Conversation.findOneAndDelete({
        _id: id,
        ownerId,
    });
}
//# sourceMappingURL=conversationService.js.map