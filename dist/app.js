import express from "express";
import conversationRoutes from "./routes/conversationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import aiRoutes from "./routes/aiRoutes.js";
import documentRoutes from "./routes/documenRoutes.js";
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "GenAI backend is running",
    });
});
app.use("/api/conversations", conversationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/documents", documentRoutes);
app.get("/", (req, res) => {
    res.send({ message: "GenAI backend is running" });
});
export default app;
//# sourceMappingURL=app.js.map