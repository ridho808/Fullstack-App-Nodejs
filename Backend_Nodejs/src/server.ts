import "dotenv/config";
import app from "./app";
import { config } from "./config/config";
import prisma from "./utils/prisma";

const server = app.listen(config.port, () => {
  prisma.$connect();
  console.log(`🖥️  Server Running on Port ${config.port}`);
});

const close = () =>
  server.close(() => {
    prisma.$disconnect();
    process.exit(0);
  });

process.on("SIGINT", () => close);
process.on("SIGTERM", () => close);
