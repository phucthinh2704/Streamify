// server.js
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import db from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// Middleware cơ bản để parse JSON nếu cần
app.use(express.json());
app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server đang chạy tại http://localhost:${PORT}`);
	db.connectDB();
});
