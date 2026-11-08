import type { NextFunction, Request, Response } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}
export declare function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
//# sourceMappingURL=authenticateToken.d.ts.map