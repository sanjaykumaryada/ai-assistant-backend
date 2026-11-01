import Conversation, { type IConversation } from "../models/Conversations.js";

interface ICreateConversationInput {
  title: string;
  ownerId: string;
}

export async function createConversationService(
  input: ICreateConversationInput,
): Promise<IConversation> {
  const conversation = await Conversation.create({
    title: input.title,
    ownerId: input.ownerId,
  });
  return conversation;
}

export async function getAllConversationsService(
  ownerId: string,
): Promise<IConversation[]> {
  const conversations = await Conversation.find({ ownerId }).sort({
    createdAt: -1,
  });
  return conversations;
}

export async function getASingleConversation(id: string, ownerId: string) {
  const conversation = await Conversation.findOne({ _id: id, ownerId });
  return conversation;
}

export async function updateConversationService(
  id: string,
  title: string,
  ownerId: string,
) {
  const conversation = await Conversation.findOneAndUpdate(
    { _id: id, ownerId },
    { title },
    { new: true, runValidators: true },
  );
  return conversation;
}

export async function deleteConversationService(id: string, ownerId: string) {
  return Conversation.findOneAndDelete({
    _id: id,
    ownerId,
  });
}
