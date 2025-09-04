import { connectDB } from "./config/db.config";
import { envConfig } from "./config/env.config";
import app from "./server";

const PORT = envConfig.port || 5000;
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})