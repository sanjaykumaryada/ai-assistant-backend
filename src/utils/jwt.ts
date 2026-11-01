import jwt from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET_NOT_FOUND");
  }
  return secret;
}

export function generateAccessToken(userId: string): string {
  return jwt.sign({}, getJwtSecret(), {
    subject: userId,
    expiresIn: "15h",
    issuer: "genai-backend",
    audience: "genai-frontend",
  });
}
