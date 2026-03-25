import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const __dirname = path.resolve();

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

//make ready for deployment as single app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
