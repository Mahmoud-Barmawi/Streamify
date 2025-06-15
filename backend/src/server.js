import express from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.route.js";
import userRoutes from "../src/routes/user.route.js";
import chatRoutes from "../src/routes/chat.router.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allow FE to send the Cookies
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
