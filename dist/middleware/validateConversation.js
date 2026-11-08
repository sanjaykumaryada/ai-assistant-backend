export function validateConversation(req, res, next) {
    const { title } = req.body;
    if (typeof title !== "string" || title.trim().length === 0) {
        res.status(400).json({
            error: "Title must be a non-empty string",
        });
    }
    next();
}
//# sourceMappingURL=validateConversation.js.map