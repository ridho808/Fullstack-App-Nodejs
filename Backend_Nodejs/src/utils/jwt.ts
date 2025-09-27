import jwt from "jsonwebtoken";
import { config } from "../config/config";

type JwtPayload = {
  sub: string;
  role: "ADMIN" | "USER";
  type: "access" | "refresh";
};

export function signAccessToken(p: JwtPayload) {
  return jwt.sign(p, config.jwtAccessSecret, { expiresIn: "15m" });
}
export function signRefreshToken(p: JwtPayload) {
  return jwt.sign(p, config.jwtRefreshSecret, { expiresIn: "7d" });
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, config.jwtAccessSecret) as JwtPayload;
}
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.jwtRefreshSecret) as JwtPayload;
}
