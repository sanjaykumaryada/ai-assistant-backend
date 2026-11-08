import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./config/database.js";
const PORT = 4000;
async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("failed to start server", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map