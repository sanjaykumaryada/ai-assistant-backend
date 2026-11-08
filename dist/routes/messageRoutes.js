import { Router } from "express";
import { createMessageController, getMessageController, } from "../controllers/MessageController.js";
const router = Router({ mergeParams: true });
router.post("/", createMessageController);
router.get("/", getMessageController);
export default router;
//# sourceMappingURL=messageRoutes.js.map