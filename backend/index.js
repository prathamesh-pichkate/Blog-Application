import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDb from "./db/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

dotenv.config();

//connect DB;
connectDb();

//middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//authentication routes
app.use("/api/user", userRouter);

//blog routes
app.use("/api/blog", blogRouter);

//comment routes
app.use("/api/comment", commentRouter);

app.listen(PORT, () => {
  console.log(`The Server Stated at port ${PORT}`);
});
