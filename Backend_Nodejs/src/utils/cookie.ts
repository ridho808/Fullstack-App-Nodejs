import { Response, Request } from "express";

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  maxAge?: number
) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge,
  });
};

export const clearCookie = (res: Response, name: string) => {
  res.cookie(name, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
};

export const getCookie = (req: Request, name: string) => {
  return req.cookies[name];
};
