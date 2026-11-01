import { Router } from "express";
import {
  createConversation,
  deleteConversationController,
  fetchAllConversations,
  getConversation,
  updateConversation,
} from "../controllers/conversationControllers.js";
import { validateConversation } from "../middleware/validateConversation.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import messageRoutes from "./messageRoutes.js";
import chatRoutes from "./chatRoutes.js";

const router: Router = Router();
router.use(authenticateToken);
router.use("/:id/messages", messageRoutes);
router.use("/:id/chat", chatRoutes);

router.get("/", fetchAllConversations);
router.post("/", validateConversation, createConversation);
router.get("/:id", getConversation);
router.patch("/:id", validateConversation, updateConversation);
router.delete("/:id", deleteConversationController);

export default router;
