import { type IConversation } from "../models/Conversations.js";
interface ICreateConversationInput {
    title: string;
    ownerId: string;
}
export declare function createConversationService(input: ICreateConversationInput): Promise<IConversation>;
export declare function getAllConversationsService(ownerId: string): Promise<IConversation[]>;
export declare function getASingleConversation(id: string, ownerId: string): Promise<(import("mongoose").Document<unknown, {}, IConversation, {}, import("mongoose").DefaultSchemaOptions> & IConversation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function updateConversationService(id: string, title: string, ownerId: string): Promise<(import("mongoose").Document<unknown, {}, IConversation, {}, import("mongoose").DefaultSchemaOptions> & IConversation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function deleteConversationService(id: string, ownerId: string): Promise<(import("mongoose").Document<unknown, {}, IConversation, {}, import("mongoose").DefaultSchemaOptions> & IConversation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export {};
//# sourceMappingURL=conversationService.d.ts.map