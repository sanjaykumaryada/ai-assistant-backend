import type { IMessage } from "../models/MessegeModel.js";
import mongoose from "mongoose";
import { ROLE_ENUM } from "../models/MessegeModel.js";
interface ICreateMessageInput extends IMessage {
    ownerId: string;
}
export declare function createMessageService(messageInput: ICreateMessageInput): Promise<{
    kind: "invalid-id";
    message?: never;
} | {
    kind: "not-found";
    message?: never;
} | {
    kind: "created";
    message: mongoose.Document<unknown, {}, IMessage, {}, mongoose.DefaultSchemaOptions> & IMessage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    };
}>;
export declare function getMessageService(conversationId: string, ownerId: string, page: number, limit: number): Promise<{
    kind: "invalid-id";
    messages?: never;
    pagination?: never;
} | {
    kind: "not-found";
    messages?: never;
    pagination?: never;
} | {
    kind: "success";
    messages: (mongoose.Document<unknown, {}, IMessage, {}, mongoose.DefaultSchemaOptions> & IMessage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}>;
export declare function createAssistantMessageService(conversationId: string, content: string): Promise<mongoose.Document<unknown, {}, IMessage, {}, mongoose.DefaultSchemaOptions> & IMessage & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare function getConversationContextService(conversationId: string, ownerId: string, limit?: number): Promise<{
    messages?: never;
    kind: "invalid-id";
    conversation?: never;
} | {
    messages?: never;
    kind: "not-found";
    conversation?: never;
} | {
    kind: "success";
    conversation: mongoose.Document<unknown, {}, import("../models/Conversations.js").IConversation, {}, mongoose.DefaultSchemaOptions> & import("../models/Conversations.js").IConversation & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    };
    messages: {
        role: ROLE_ENUM;
        content: string;
    }[];
}>;
export {};
//# sourceMappingURL=messageService.d.ts.map