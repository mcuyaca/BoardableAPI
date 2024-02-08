import { configDotenv } from "dotenv";
import express from "express";
import { dbShutdown } from "./db";
import logRequest from "./middlewares/logRequest";
import errorHandler from "./middlewares/error";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(express.json());
process.on("SIGINT", dbShutdown);
process.on("SIGTERM", dbShutdown);
app.use(logRequest);
app.use(errorHandler);
