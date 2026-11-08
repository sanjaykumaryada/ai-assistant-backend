import { Schema, model, Types } from "mongoose";
const documentSchema = new Schema({
    ownerId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    filename: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    filepath: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["uploaded", "processing", "completed", "failed"],
        default: "uploaded",
        required: true,
    },
}, { timestamps: true });
documentSchema.index({ ownerId: 1, createdAt: -1 });
const DocumentModel = model("Document", documentSchema);
export default DocumentModel;
//# sourceMappingURL=Document.js.map