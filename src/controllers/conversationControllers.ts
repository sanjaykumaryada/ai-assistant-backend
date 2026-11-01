import type { Request, Response } from "express";
import {
  createConversationService,
  deleteConversationService,
  getAllConversationsService,
  getASingleConversation,
  updateConversationService,
} from "../services/conversationService.js";
import mongoose from "mongoose";
import type { AuthenticatedRequest } from "../middleware/authenticateToken.js";

export async function createConversation(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const ownerId = req?.user!.id;
  try {
    const conversation = await createConversationService({
      title: req.body.title,
      ownerId,
    });
    res.status(201).json({
      msg: "conversation created successfully",
      conversation,
    });
  } catch (error) {
    console.error("failed to create", error);
    res.status(500).json({
      error: ":failed to create conversation",
    });
  }
}

export async function fetchAllConversations(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const ownerId = req?.user!.id;
  try {
    const conversations = await getAllConversationsService(ownerId);
    res.status(200).json(conversations);
  } catch (error) {
    console.error("failed to create", error);
    res.status(500).json({
      error: ":failed to create conversation",
    });
  }
}

export async function getConversation(
  req: AuthenticatedRequest,
  res: Response,
) {
  const mongoId = req.params.id;
  // 1. Ensure it's a string and a valid MongoDB ObjectId
  if (typeof mongoId !== "string" || !mongoose.isValidObjectId(mongoId)) {
    // 2. CRITICAL: Use 'return' so execution stops here!
    return res.status(400).json({ error: "Not a valid mongo Id" });
  }
  try {
    const c = await getASingleConversation(mongoId, req?.user!.id);
    if (!c) {
      return res.status(404).json({
        error: "not found",
      });
    }
    return res.status(200).json(c);
  } catch (error) {
    console.error("failed to create", error);
    res.status(500).json({
      error: ":failed to create conversation",
    });
  }
}

export async function updateConversation(
  req: AuthenticatedRequest,
  res: Response,
) {
  const conversationId = req.params.id;
  const { title } = req.body;
  if (
    typeof conversationId !== "string" ||
    !mongoose.isValidObjectId(conversationId)
  ) {
    return res.status(400).json({ error: "Not a valid mongo Id" });
  }

  try {
    const conversation = await updateConversationService(
      conversationId,
      title,
      req?.user!.id,
    );
    if (!conversation) {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error("failed to create", error);
    res.status(500).json({
      error: ":failed to update conversation",
    });
  }
}

export async function deleteConversationController(
  req: AuthenticatedRequest,
  res: Response,
) {
  const conversationId = req.params.id;
  if (
    typeof conversationId !== "string" ||
    !mongoose.isValidObjectId(conversationId)
  ) {
    return res.status(400).json({ error: "Not a valid mongo Id" });
  }
  try {
    const deletedConversation = await deleteConversationService(
      conversationId,
      req?.user!.id,
    );
    if (!deletedConversation) {
      return res.status(404).json({ error: "not found" });
    }
    return res.status(200).send(deletedConversation);
  } catch (error) {
    console.error("failed to create", error);
    res.status(500).json({
      error: ":failed to update conversation",
    });
  }
}
