import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { documentUploadController } from "../controllers/documentController.js";
import { upload } from "../config/multer.js";
const router = Router();
router.use(authenticateToken);
router.post("/", upload.single("file"), documentUploadController);
export default router;
//# sourceMappingURL=documenRoutes.js.map