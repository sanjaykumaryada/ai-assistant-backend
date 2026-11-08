import type { AuthenticatedRequest } from "../middleware/authenticateToken.js";
import type { Response, NextFunction } from "express";
export declare function sendMessageController(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=chatController.d.ts.map