"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
  let maxAge =
    name == "accessToken" ? 1000 * 60 * 60 * 24 : 1000 * 60 * 60 * 24 * 7;
  (await cookies()).set(name, value, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge,
  });
}

export async function getCookie(name: string) {
  return (await cookies()).get(name)?.value;
}
