import { Schema, Types, model } from "mongoose";
export var ROLE_ENUM;
(function (ROLE_ENUM) {
    ROLE_ENUM["USER"] = "user";
    ROLE_ENUM["ASSISTANT"] = "ASSISTANT";
})(ROLE_ENUM || (ROLE_ENUM = {}));
const messageSchema = new Schema({
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
}, {
    timestamps: true,
});
messageSchema.index({ conversationId: 1, createdAt: 1 });
const MessageModel = model("Message", messageSchema);
export default MessageModel;
//# sourceMappingURL=MessegeModel.js.map