import { configDotenv } from "dotenv";
import express from "express";
import { dbShutdown } from "./db";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(express.json());
process.on("SIGINT", dbShutdown);
process.on("SIGTERM", dbShutdown);
