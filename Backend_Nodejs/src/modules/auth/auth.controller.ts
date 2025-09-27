import { Request, Response } from "express";
import { clearCookie, setCookie } from "src/utils/cookie";
import { authService } from "./auth.service";
import { SigninBody, SignupBody } from "./auth.types";
import { verifyAccessToken } from "src/utils/jwt";
import createHttpError from "http-errors";

const { signup } = authService;

export const authController = {
  async signup(req: Request, res: Response) {
    const body = req.body as unknown as SignupBody;
    const { user, accessToken, refreshToken } = await signup(body);
    setCookie(res, "accessToken", accessToken, 1000 * 60 * 60 * 24);
    setCookie(res, "refreshToken", refreshToken, 1000 * 60 * 60 * 24 * 7);
    let userData = {
      ...user,
      password: undefined,
    };
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: userData,
        accessToken,
        refreshToken,
      },
    });
  },
  async signupAdmin(req: Request, res: Response) {
    const body = req.body as unknown as SignupBody;
    const { user } = await authService.signupAdmin(body);
    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        ...user,
        password: undefined,
      },
    });
  },
  async signin(req: Request, res: Response) {
    const body = req.body as unknown as SigninBody;

    const { user, accessToken, refreshToken } = await authService.signin(body);
    setCookie(res, "accessToken", accessToken, 1000 * 60 * 60 * 24);
    setCookie(res, "refreshToken", refreshToken, 1000 * 60 * 60 * 24 * 7);
    let userData = {
      ...user,
      password: undefined,
    };
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: userData,
        accessToken,
        refreshToken,
      },
    });
  },
  async signinAdmin(req: Request, res: Response) {
    const body = req.body as unknown as SigninBody;
    const { user, accessToken, refreshToken } =
      await authService.signinAdmin(body);
    setCookie(res, "accessToken", accessToken, 1000 * 60 * 60 * 24);
    setCookie(res, "refreshToken", refreshToken, 1000 * 60 * 60 * 24 * 7);
    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: {
        ...user,
        password: undefined,
      },
    });
  },
  async signout(req: Request, res: Response) {
    const userId = req.cookies.accessToken;
    const { sub } = verifyAccessToken(userId);
    if (!sub) {
      throw createHttpError(401, "Invalid access token");
    }
    await authService.signout(sub);
    clearCookie(res, "accessToken");
    clearCookie(res, "refreshToken");
    return res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  },
  async refreshToken(req: Request, res: Response) {
    const refreshToken =
      req.headers.authorization?.split(" ")[1] || req.cookies.refreshToken;
    if (!refreshToken) {
      throw createHttpError(401, "Invalid refresh token");
    }
    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refreshNewToken(refreshToken);
    setCookie(res, "accessToken", accessToken, 1000 * 60 * 60 * 24);
    setCookie(res, "refreshToken", newRefreshToken, 1000 * 60 * 60 * 24 * 7);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  },
};
