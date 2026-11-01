import { model, Schema } from "mongoose";

export interface IConversation {
  title: string;
  ownerId: string;
}

const conversationSchema = new Schema<IConversation>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = model<IConversation>("Conversation", conversationSchema);

export default Conversation;
