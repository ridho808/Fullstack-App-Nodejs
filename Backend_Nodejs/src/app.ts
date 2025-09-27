import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "node:path";

import pinoHttp from "pino-http";
import { logger } from "./utils/logger";
import { config } from "./config/config";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { notFound } from "./middleware/notfound";
import { errorHandler } from "./middleware/error";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, "../", "uploads");

app.use(
  cors({
    origin: config.corsOrigins?.split(","),
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(pinoHttp({ logger }));
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
