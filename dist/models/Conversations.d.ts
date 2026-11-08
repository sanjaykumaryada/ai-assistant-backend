export interface IConversation {
    title: string;
    ownerId: string;
}
declare const Conversation: import("mongoose").Model<IConversation, {}, {}, {}, import("mongoose").Document<unknown, {}, IConversation, {}, import("mongoose").DefaultSchemaOptions> & IConversation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IConversation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default Conversation;
//# sourceMappingURL=Conversations.d.ts.map