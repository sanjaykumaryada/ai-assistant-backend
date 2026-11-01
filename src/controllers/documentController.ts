import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/authenticateToken.js";
import { createDocumentService } from "../services/documentService.js";
export async function documentUploadController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) {
      res.status(400).json({ error: "document file is required" });
      return;
    }
    const document = await createDocumentService({
      ownerId: req.user!.id,
      filename: req.file.fieldname,
      filepath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      originalName: req.file.originalname,
    });
    res.status(201).json({
      message: "document uploaded successfully",
      document,
    });
  } catch (error) {
    next(error);
  }
}
