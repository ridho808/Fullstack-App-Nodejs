import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  if (status >= 500) logger.error({ err }, "Unhandled error");
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_SERVER_ERROR",
    detail: err.details,
  });
}
