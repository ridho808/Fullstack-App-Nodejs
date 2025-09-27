import prisma from "src/utils/prisma";
import { hash, verify } from "src/utils/crypto";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "src/utils/jwt";
import { SigninBody, SignupBody } from "./auth.types";
import createHttpError from "http-errors";
import { userRepository } from "src/repositories/user.repo";
import { refreshTokenRepository } from "src/repositories/refreshtoken.repo";

export const authService = {
  async signup(body: SignupBody) {
    const { email, name, username, password } = body;

    const hashedPassword = await hash(password);
    // Check if user already exists
    const existingUser = await userRepository.findByEmailOrUsername(email);

    if (existingUser) {
      throw createHttpError(409, {
        message: "User already exists",
        code: "USER_ALREADY_EXISTS",
      });
    }
    // Create user
    const user = await userRepository.createUser({
      email,
      name,
      username,
      password: hashedPassword,
      role: "USER",
    });
    // Sign Access Token
    const accessToken = signAccessToken({
      sub: user.id,
      type: "access",
      role: user.role,
    });
    // Sign Refresh Token
    const refreshToken = signRefreshToken({
      sub: user.id,
      type: "refresh",
      role: user.role,
    });
    // Save Refresh Token
    await refreshTokenRepository.create(refreshToken, user.id);
    return {
      user,
      accessToken,
      refreshToken,
    };
  },
  async signupAdmin(body: SignupBody) {
    const { email, name, username, password } = body;
    const hashedPassword = await hash(password);
    // Check if user already exists
    const existingUser = await userRepository.findByEmailOrUsername(email);
    if (existingUser) {
      throw createHttpError(409, {
        message: "User already exists",
        code: "USER_ALREADY_EXISTS",
      });
    }
    // Create user
    const user = await userRepository.createUser({
      email,
      name,
      username,
      password: hashedPassword,
      role: "ADMIN",
    });
    // Sign Access Token
    const accessToken = signAccessToken({
      sub: user.id,
      type: "access",
      role: user.role,
    });
    // Sign Refresh Token
    const refreshToken = signRefreshToken({
      sub: user.id,
      type: "refresh",
      role: user.role,
    });
    // Save Refresh Token
    await refreshTokenRepository.create(refreshToken, user.id);
    return {
      user,
      accessToken,
      refreshToken,
    };
  },
  async signin(body: SigninBody) {
    const { email_or_username, password } = body;
    // Check if user exists
    const user = await userRepository.findByEmailOrUsername(email_or_username);
    if (!user) {
      throw createHttpError(400, {
        message: "User Not Found",
        code: "USER_NOT_FOUND",
      });
    }
    // Check if password is correct
    const isPasswordCorrect = await verify(user.password, password);
    if (!isPasswordCorrect) {
      throw createHttpError(409, {
        message: "Invalid credentials",
        code: "INVALID_CREDENTIALS",
      });
    }
    // Sign Access Token
    const accessToken = signAccessToken({
      sub: user.id,
      type: "access",
      role: user.role,
    });
    // Sign Refresh Token
    const refreshToken = signRefreshToken({
      sub: user.id,
      type: "refresh",
      role: user.role,
    });
    // Save Refresh Token
    await refreshTokenRepository.updateNewTokenByuseId(user.id, refreshToken);
    return {
      user,
      accessToken,
      refreshToken,
    };
  },
  async signinAdmin(body: SigninBody) {
    const { email_or_username, password } = body;
    // Check if user exists
    const user = await userRepository.findByEmailOrUsername(email_or_username);
    if (!user) {
      throw createHttpError(400, {
        message: "User Not Found",
        code: "USER_NOT_FOUND",
      });
    }
    // Check if user is admin
    if (user.role !== "ADMIN") {
      throw createHttpError(403, {
        message: "Forbidden, only admin can sign in",
        code: "FORBIDDEN",
      });
    }
    // Check if password is correct
    const isPasswordCorrect = await verify(user.password, password);
    if (!isPasswordCorrect) {
      throw createHttpError(409, {
        message: "Invalid credentials",
        code: "INVALID_CREDENTIALS",
      });
    }
    // Sign Access Token
    const accessToken = signAccessToken({
      sub: user.id,
      type: "access",
      role: user.role,
    });
    // Sign Refresh Token
    const refreshToken = signRefreshToken({
      sub: user.id,
      type: "refresh",
      role: user.role,
    });
    // Save Refresh Token
    await refreshTokenRepository.updateNewTokenByuseId(user.id, refreshToken);
    return {
      user,
      accessToken,
      refreshToken,
    };
  },
  async signout(userId: string) {
    await refreshTokenRepository.updateEmptyTokenByUserId(userId);
  },
  async refreshNewToken(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      throw createHttpError(401, "Invalid refresh token");
    }
    const user = await userRepository.findUserById(payload.sub);
    if (!user) {
      throw createHttpError(401, "Invalid refresh token");
    }
    const accessToken = signAccessToken({
      sub: user.id,
      type: "access",
      role: user.role,
    });
    const newRefreshToken = signRefreshToken({
      sub: user.id,
      type: "refresh",
      role: user.role,
    });
    await refreshTokenRepository.updateNewTokenByuseId(
      user.id,
      newRefreshToken
    );
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },
};
