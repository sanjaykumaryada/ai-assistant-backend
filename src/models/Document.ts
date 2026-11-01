import { Schema, model, Types } from "mongoose";

export interface IDocument {
  ownerId: Types.ObjectId;
  filename: string;
  originalName: string;
  filepath: string;
  mimeType: string;
  size: number;
  status: "uploaded" | "processing" | "completed" | "failed";
}

const documentSchema = new Schema<IDocument>(
  {
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
  },
  { timestamps: true },
);

documentSchema.index({ ownerId: 1, createdAt: -1 });
const DocumentModel = model<IDocument>("Document", documentSchema);
export default DocumentModel;
