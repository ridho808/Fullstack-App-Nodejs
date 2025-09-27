import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const validate =
  (schema: { body?: ZodObject; params?: ZodObject; query?: ZodObject }) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        if (req.body === undefined) req.body = {};
        req.body = schema.body.parse(req.body);
      }
      if (schema.params) {
        if (req.params === undefined) req.params = {};
        req.params = schema.params.parse(req.params) as Record<string, string>;
      }
      if (schema.query) {
        schema.query.parse(req.query);
      }
      next();
    } catch (err: unknown) {
      console.log(err);

      if (err instanceof ZodError) {
        next(
          createHttpError(400, {
            message: "Validation error",
            code: "VALIDATION_ERROR",
            details: err.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message,
            })),
          })
        );
      } else {
        next(
          createHttpError(400, {
            message: "Invalid request",
            code: "INVALID_REQUEST",
          })
        );
      }
      next(
        createHttpError(400, {
          message: "Invalid request",
          code: "INVALID_REQUEST",
        })
      );
    }
  };
