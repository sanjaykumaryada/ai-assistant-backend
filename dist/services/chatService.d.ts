import mongoose from "mongoose";
interface SendMessageInput {
    conversationId: string;
    ownerId: string;
    content: string;
}
export declare function sendMessageService(input: SendMessageInput): Promise<{
    kind: "invalid-id";
    conversation?: never;
    messages?: never;
} | {
    kind: "not-found";
    conversation?: never;
    messages?: never;
} | {
    kind: "user-message-created";
    userMessage: mongoose.Document<unknown, {}, import("../models/MessegeModel.js").IMessage, {}, mongoose.DefaultSchemaOptions> & import("../models/MessegeModel.js").IMessage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    };
    assistantMessage: mongoose.Document<unknown, {}, import("../models/MessegeModel.js").IMessage, {}, mongoose.DefaultSchemaOptions> & import("../models/MessegeModel.js").IMessage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    };
}>;
export {};
//# sourceMappingURL=chatService.d.ts.map