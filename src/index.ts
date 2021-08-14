import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import trim from "./middlewares/trim";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

// routes modules
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import subRoutes from "./routes/post";
import miscRoutes from "./routes/misc";
import userRoutes from "./routes/users";

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(express.static("public"));

// routes
app.get("/", (req, res) => res.send("Hi there"));
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/sub", subRoutes);
app.use("/api/misc", miscRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, async () => {
  console.log("app running on port 4000");

  try {
    await createConnection();
    console.log("databse connected");
  } catch (err) {
    console.log(err);
  }
});
