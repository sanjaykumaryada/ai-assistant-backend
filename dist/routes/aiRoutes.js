import { Router } from "express";
import { textAiController } from "../controllers/aiController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = Router();
router.use(authenticateToken);
router.post("/test", textAiController);
export default router;
//# sourceMappingURL=aiRoutes.js.map