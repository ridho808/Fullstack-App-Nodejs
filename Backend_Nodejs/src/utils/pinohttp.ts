import pinoHttp from "pino-http";
import { logger } from "../utils/logger";
import jwt from "jsonwebtoken";
import { stdSerializers } from "pino";

function genReqId(req: any) {
  return req.headers["x-request-id"] || crypto.randomUUID();
}

export const httpLogger = pinoHttp({
  logger,
  genReqId,
  useLevel: "info",
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  customSuccessMessage: function (req, res) {
    return `${req.method} ${req.url} completed`;
  },
  customErrorMessage: function (req, res, err) {
    return `${req.method} ${req.url} error: ${err?.message || res.statusCode}`;
  },
  serializers: {
    req(req) {
      return {
        id: (req as any).id,
        method: req.method,
        url: req.url,
        headers: {
          "user-agent": req.headers["user-agent"],
          "x-request-id": req.headers["x-request-id"],
        },
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
    err: stdSerializers.err,
  },
  customProps: function (req, res) {
    const responseTime = (res as any).getHeader
      ? Number(res.getHeader("X-Response-Time") || 0)
      : (res as any).responseTime;

    // coba extract userId dari Authorization Bearer; fallback dari cookie
    let userId: string | undefined;
    const auth = req.headers.authorization || "";
    const m = auth.match(/^Bearer\s+(.+)$/i);
    const token = m?.[1];

    try {
      if (token) {
        const payload = jwt.decode(token) as any;
        userId = payload?.sub;
      }
    } catch {}

    return { responseTime, userId };
  },
});
