import { generateAiResponseService } from "../services/aiService.js";
export async function textAiController(req, res, next) {
    const { prompt = "" } = req.body || {};
    if (!prompt || !prompt.trim() || typeof prompt !== "string") {
        return res.status(400).json({
            error: "prompt is required",
        });
    }
    try {
        const answer = await generateAiResponseService([
            { role: "user", parts: [{ text: prompt.trim() }] },
        ]);
        res.status(200).json({ answer });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=aiController.js.map