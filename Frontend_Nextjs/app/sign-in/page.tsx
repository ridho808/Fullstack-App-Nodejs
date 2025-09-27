"use client";

import { HandleSignIn } from "@/src/actions/FormAuthAction";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function signInPage() {
  const initialState = { ok: undefined, errors: "", message: "" };
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    HandleSignIn,
    initialState
  );

  useEffect(() => {
    if (state.ok) {
      router.push("/");
    }
  }, [state]);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={clsx("text-2xl font-bold", { "text-violet-600": true })}>
        Sign In
      </h1>
      <Card className="min-w-[300px] md:w-[400px]">
        <CardBody className="p-6">
          <form action={formAction} className="flex flex-col gap-4">
            <Input
              label="Email or Username"
              name="email_or_username"
              required
              placeholder="Masukkan Email atau Username Anda"
            />
            <Input
              label="Password"
              name="password"
              required
              placeholder="Masukkan Password Anda"
              type="password"
            />
            <Button
              size="md"
              variant="solid"
              color="secondary"
              type="submit"
              className="w-full"
              disabled={pending}
            >
              Sign In
            </Button>
            {state.ok && (
              <Alert color="success" title={state.message} className="w-full" />
            )}
            {!state.ok && state.errors && (
              <Alert color="danger" title={state.message} className="w-full" />
            )}
          </form>
        </CardBody>
        <CardFooter className="p-2 flex flex-row items-center justify-center gap-2">
          <span className="text-md text-gray-500">Belum memiliki akun? </span>
          <Link
            isBlock
            showAnchorIcon
            underline="always"
            color="secondary"
            href="/sign-up"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
