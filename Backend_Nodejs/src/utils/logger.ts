import pino from "pino";

const isProd = process.env.NODE_ENV === "production";

const redact = {
  paths: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
    "req.body.password",
    "req.body.token",
    "res.body.accessToken",
    "res.body.refreshToken",
  ],
  censor: "***",
};

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProd ? "info" : "debug"),
  redact,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname",
          messageFormat:
            "{req.method} {req.url} -> {res.statusCode} ({responseTime}ms) {userId}",
          singleLine: true,
        },
      }
    : undefined,
});
