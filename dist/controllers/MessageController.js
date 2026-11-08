import { ROLE_ENUM } from "../models/MessegeModel.js";
import { createMessageService, getMessageService, } from "../services/messageService.js";
import mongoose, { Mongoose } from "mongoose";
export async function createMessageController(req, res, next) {
    const { role, content } = req.body;
    if (role !== ROLE_ENUM.USER ||
        !content.trim() ||
        typeof content !== "string") {
        res.status(400).json({
            error: "valid role and non-empty content are required",
        });
        return;
    }
    const rawId = req.params.id;
    if (!rawId ||
        typeof rawId !== "string" ||
        !mongoose.Types.ObjectId.isValid(rawId)) {
        res.status(400).json({
            error: "conversation id must be string",
        });
        return;
    }
    try {
        const result = await createMessageService({
            content: content.trim(),
            conversationId: new mongoose.Types.ObjectId(rawId),
            role,
            ownerId: req.user.id,
        });
        if (result.kind === "invalid-id") {
            res.status(400).json({ error: "Valid id is required" });
            return;
        }
        if (result.kind === "not-found") {
            res.status(404).json({ error: "no conversation found with this id" });
            return;
        }
        res.status(201).json({
            message: result.message,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function getMessageController(req, res, next) {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);
    if (!Number.isInteger(page) ||
        !Number.isInteger(limit) ||
        page < 1 ||
        limit < 1 ||
        limit > 100) {
        res.status(400).json({ error: "invalid pagination parameters" });
        return;
    }
    try {
        const result = await getMessageService(req.params.id, req.user.id, page, limit);
        if (result.kind === "invalid-id") {
            res.status(400).json({ error: "Valid id is required" });
            return;
        }
        if (result.kind === "not-found") {
            res.status(404).json({ error: "no conversation found with this id" });
            return;
        }
        res.status(201).json({
            messages: result.messages,
            pagination: result.pagination,
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=MessageController.js.map