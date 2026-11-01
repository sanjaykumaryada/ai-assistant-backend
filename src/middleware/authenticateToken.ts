import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET_NOT_FOUND");
  }
  return secret;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({
      error: "Authentication token required",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret(), {
      issuer: "genai-backend",
      audience: "genai-frontend",
      algorithms: ["HS256"],
    });
    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      !decoded.sub
    ) {
      res.status(401).json({ error: "authentication token is invalid" });
      return;
    }
    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      res
        .status(401)
        .json({ error: "Invalid or expired authentication token" });
      return;
    }
    next(error);
  }
}
