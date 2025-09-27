import { NextResponse } from "next/server";
import { headers as nextHeaders } from "next/headers";

export async function GET() {
  const incomingCookie = (await nextHeaders()).get("cookie") ?? "";

  const upstream = await fetch(`${process.env.API_URL}/api/auth/refresh`, {
    method: "GET",
    headers: { cookie: incomingCookie },
    credentials: "include",
  });

  const body = await upstream.text();
  const res = new NextResponse(body, { status: upstream.status });

  const setCookies =
    (upstream.headers as any).getSetCookie?.() ??
    upstream.headers.get("set-cookie");

  if (Array.isArray(setCookies)) {
    setCookies.forEach((c) => res.headers.append("set-cookie", c));
  } else if (setCookies) {
    res.headers.set("set-cookie", setCookies);
  }

  const ct = upstream.headers.get("content-type");
  if (ct) res.headers.set("content-type", ct);

  return res;
}
