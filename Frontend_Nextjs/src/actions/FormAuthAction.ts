"use server";

import { setCookie } from "../utils/cookie";

type FormState = {
  ok?: undefined | boolean;
  message?: string;
  errors?: string;
};

export async function HandleSignUp(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email");
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");
  const bodyRaw = {
    email,
    name,
    username,
    password,
  };
  const body = JSON.stringify(bodyRaw);

  let res = await fetch(`${process.env.API_URL}/api/auth/sign_up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  let data = await res.json();
  if (data.success) {
    await setCookie("accessToken", data.data.accessToken);
    await setCookie("refreshToken", data.data.refreshToken);
    return {
      ok: true,
      message: "Sign Up Success",
      errors: "",
    };
  } else {
    return {
      ok: false,
      message: `ERROR : ${data.message ? data.message : data.error}`,
      errors: data.message ? data.message : data.error,
    };
  }
}

export async function HandleSignIn(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email_or_username");
  const password = formData.get("password");
  const bodyRaw = {
    email_or_username: email,
    password,
  };

  const body = JSON.stringify(bodyRaw);

  let res = await fetch(`${process.env.API_URL}/api/auth/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  let data = await res.json();
  if (data.success) {
    await setCookie("accessToken", data.data.accessToken);
    await setCookie("refreshToken", data.data.refreshToken);
    return {
      ok: true,
      message: "Sign Up Success",
      errors: "",
    };
  } else {
    return {
      ok: false,
      message: `ERROR : ${data.message ? data.message : data.error}`,
      errors: data.message ? data.message : data.error,
    };
  }
}
