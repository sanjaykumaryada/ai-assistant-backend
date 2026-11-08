import multer from "multer";
import path from "node:path";
const allowedMineTypes = [
    "application/pdf",
    "text/markdown",
    "application/json",
];
const allowedExtensions = [".pdf", ".md", ".json", ".markdown"];
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/uploads/documents");
    },
    filename(req, file, callback) {
        const uniquename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        callback(null, uniquename);
    },
});
export const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const isAllowedMimeType = allowedMineTypes.includes(file.mimetype);
        const isAllowedExtension = allowedExtensions.includes(extension);
        if (!isAllowedExtension || !isAllowedMimeType) {
            cb(new Error("unsupported file types"));
            return;
        }
        cb(null, true);
    },
    limits: {
        fileSize: 10 * 1024 * 1024, //10MB
        files: 1,
    },
});
//# sourceMappingURL=multer.js.map