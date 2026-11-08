import { Types } from "mongoose";
export declare enum ROLE_ENUM {
    USER = "user",
    ASSISTANT = "ASSISTANT"
}
export interface IMessage {
    conversationId: Types.ObjectId;
    content: string;
    role: ROLE_ENUM.USER | ROLE_ENUM.ASSISTANT;
}
declare const MessageModel: import("mongoose").Model<IMessage, {}, {}, {}, import("mongoose").Document<unknown, {}, IMessage, {}, import("mongoose").DefaultSchemaOptions> & IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export default MessageModel;
//# sourceMappingURL=MessegeModel.d.ts.map