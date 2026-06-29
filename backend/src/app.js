import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

//route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.use(express.static(path.join(__dirname, "../../frontend")));

export default app;