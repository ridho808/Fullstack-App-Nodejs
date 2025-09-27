"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function LogoutAction() {
  await fetch(`${process.env.API_URL}/api/auth/sign_out`, {
    method: "DELETE",
    credentials: "include",
  });

  (await cookies()).set("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  (await cookies()).set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  redirect("/sign-in");
}
