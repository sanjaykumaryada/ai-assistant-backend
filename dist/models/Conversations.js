import { model, Schema } from "mongoose";
const conversationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Conversation = model("Conversation", conversationSchema);
export default Conversation;
//# sourceMappingURL=Conversations.js.map