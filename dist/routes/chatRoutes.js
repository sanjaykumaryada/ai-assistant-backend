import { Router } from "express";
import { sendMessageController } from "../controllers/chatController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = Router({ mergeParams: true });
router.use(authenticateToken);
router.post("/", sendMessageController);
export default router;
//# sourceMappingURL=chatRoutes.js.map