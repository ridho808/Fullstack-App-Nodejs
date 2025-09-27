import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import JWT from "jsonwebtoken";
import { verifyAccessToken, verifyRefreshToken } from "src/utils/jwt";

export const authAccessGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Headers Authorize
    const authHeader = req.headers.authorization;
    const accessToken = authHeader
      ? authHeader.split(" ")[1]
      : req.cookies.accessToken;

    if (!accessToken) {
      throw createError(401, {
        message: "Unauthorized",
        code: "NO_ACCESS_TOKEN",
      });
    }
    const { sub, type } = verifyAccessToken(accessToken);
    if (!sub || type != "access") {
      throw createError(401, {
        message: "Invalid access token",
        code: "INVALID_ACCESS_TOKEN",
      });
    }
    next();
  } catch (error) {
    //JWT EXPIRED
    if (
      error instanceof JWT.JsonWebTokenError ||
      error instanceof JWT.TokenExpiredError
    ) {
      throw createError(400, {
        message: "Access token expired",
        code: "JWT_EXPIRED",
      });
    }
    next(error);
  }
};

export const authRefreshGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const refreshToken = authHeader
      ? authHeader.split(" ")[1]
      : req.cookies.refreshToken;

    if (!refreshToken) {
      throw createError(401, {
        message: "Unauthorized",
        code: "NO_REFRESH_TOKEN",
      });
    }
    const { sub, type } = verifyRefreshToken(refreshToken);

    if (!sub || type != "refresh") {
      throw createError(401, {
        message: "Invalid access token",
        code: "INVALID_ACCESS_TOKEN",
      });
    }
    next();
  } catch (error) {
    console.log(error);

    //JWT EXPIRED
    if (
      error instanceof JWT.JsonWebTokenError ||
      error instanceof JWT.TokenExpiredError
    ) {
      throw createError(400, {
        message: "Access token expired",
        code: "JWT_EXPIRED",
      });
    }
    next(error);
  }
};

export const authRoleGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader
      ? authHeader.split(" ")[1]
      : req.cookies.accessToken;
    if (!accessToken) {
      throw createError(401, {
        message: "Unauthorized",
        code: "NO_ACCESS_TOKEN",
      });
    }
    const { sub, role } = verifyAccessToken(accessToken);
    if (!sub || role != "ADMIN") {
      throw createError(401, {
        message: "Invalid access token",
        code: "INVALID_ACCESS_TOKEN",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
