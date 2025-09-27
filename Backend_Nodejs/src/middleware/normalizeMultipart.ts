import { Request, Response, NextFunction } from "express";

export function normalizeMultipartJson(jsonFields: string[] = []) {
  return (req: Request, _res: Response, next: NextFunction) => {
    for (const key of jsonFields) {
      const v = (req.body as any)?.[key];
      if (typeof v === "string") {
        try {
          (req.body as any)[key] = JSON.parse(v);
        } catch {
          /* biar zod yang nolak */
        }
      }
    }
    next();
  };
}
