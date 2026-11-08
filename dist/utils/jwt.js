import jwt from "jsonwebtoken";
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET_NOT_FOUND");
    }
    return secret;
}
export function generateAccessToken(userId) {
    return jwt.sign({}, getJwtSecret(), {
        subject: userId,
        expiresIn: "15h",
        issuer: "genai-backend",
        audience: "genai-frontend",
    });
}
//# sourceMappingURL=jwt.js.map