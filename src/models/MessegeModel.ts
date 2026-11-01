import { Schema, Types, model } from "mongoose";

export enum ROLE_ENUM {
  USER = "user",
  ASSISTANT = "ASSISTANT",
}

export interface IMessage {
  conversationId: Types.ObjectId;
  content: string;
  role: ROLE_ENUM.USER | ROLE_ENUM.ASSISTANT;
}

const messageSchema = new Schema<IMessage>(
  {
    conversationId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    content: {
      required: true,
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: [ROLE_ENUM.USER, ROLE_ENUM.ASSISTANT],
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ conversationId: 1, createdAt: 1 });

const MessageModel = model<IMessage>("Message", messageSchema);
export default MessageModel;
