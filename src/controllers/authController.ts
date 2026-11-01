import type { NextFunction, Request, Response } from "express";
import {
  createUserService,
  loginUserService,
} from "../services/authService.js";
import { generateAccessToken } from "../utils/jwt.js";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be atleast 8 characters",
    });
  }

  try {
    const user = await createUserService(email, password);
    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXIST") {
      return res.status(409).json({
        error: "An account with this email already exists",
      });
    }

    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be atleast 8 characters",
    });
  }

  try {
    const user = await loginUserService(email, password);
    const accessToken = generateAccessToken(user.id);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 60 * 60 * 100,
      path: "/",
    });
    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        error: "Unauthorised",
      });
    }

    next(error);
  }
}
export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json({
    message: "logout successful!",
  });
}
