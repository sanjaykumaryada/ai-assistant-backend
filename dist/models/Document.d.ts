import { Types } from "mongoose";
export interface IDocument {
    ownerId: Types.ObjectId;
    filename: string;
    originalName: string;
    filepath: string;
    mimeType: string;
    size: number;
    status: "uploaded" | "processing" | "completed" | "failed";
}
declare const DocumentModel: import("mongoose").Model<IDocument, {}, {}, {}, import("mongoose").Document<unknown, {}, IDocument, {}, import("mongoose").DefaultSchemaOptions> & IDocument & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IDocument & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export default DocumentModel;
//# sourceMappingURL=Document.d.ts.map