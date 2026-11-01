import type { NextFunction, Request, Response } from "express";

export function validateConversation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({
      error: "Title must be a non-empty string",
    });
  }
  next();
}
