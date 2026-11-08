import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../middleware/authenticateToken.js";
export declare function createMessageController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getMessageController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=MessageController.d.ts.map