import { sendMessageService } from "../services/chatService.js";
import mongoose from "mongoose";
export async function sendMessageController(req, res, next) {
    const { content } = req.body;
    const { id } = req.params;
    if (typeof content !== "string" ||
        !content.trim() ||
        typeof id !== "string" ||
        !mongoose.isValidObjectId(id)) {
        res.status(400).json({ error: "Message content is required" });
        return;
    }
    try {
        const result = await sendMessageService({
            conversationId: id,
            ownerId: req?.user.id,
            content: content.trim(),
        });
        if (result.kind === "invalid-id") {
            return res.status(400).json({ error: "Invalid conversation Id" });
        }
        if (result.kind === "not-found") {
            return res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json({
            userMessage: result.userMessage,
            assistantMessage: result.assistantMessage,
        });
    }
    catch (error) {
        console.error("failed to create", error);
        res.status(500).json({
            error: ":failed to update conversation",
        });
    }
}
//# sourceMappingURL=chatController.js.map