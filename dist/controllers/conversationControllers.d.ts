import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/authenticateToken.js";
export declare function createConversation(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function fetchAllConversations(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getConversation(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateConversation(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteConversationController(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=conversationControllers.d.ts.map