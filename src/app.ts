import { configDotenv } from "dotenv";
import express from "express";
import { dbShutdown } from "./db";
import logRequest from "./middlewares/logRequest";
import errorHandler from "./middlewares/error";
import authRouter from "./routers/auth-router";
import cors from "cors";
import { accountRouter } from "./routers/account-router";
import { boardRouter } from "./routers/board-router";
import { listRouter } from "./routers/list-router";
import { taskRouter } from "./routers/task-router";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();
app.use(cors());
app.use(express.json());
process.on("SIGINT", dbShutdown);
process.on("SIGTERM", dbShutdown);
app.use(logRequest);
app.use("/", authRouter);
app.use("/account", accountRouter);
app.use("/board", boardRouter);
app.use("/list", listRouter);
app.use("/task", taskRouter);
app.use(errorHandler);
