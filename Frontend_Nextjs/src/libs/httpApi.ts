"use client";

type ApiInput = RequestInfo | URL;
type ApiInit = RequestInit & {
  retryOn401?: boolean;
  parseAs?: "json" | "text" | "blob" | "arrayBuffer";
};

const API_BASE = "http://localhost:4000";
const REFRESH_URL = "/api/auth/refresh";

class TokenRefresher {
  private inFlight: Promise<boolean> | null = null;

  refresh(): Promise<boolean> {
    if (!this.inFlight) {
      this.inFlight = this.doRefresh().finally(() => {
        this.inFlight = null;
      });
    }
    return this.inFlight;
  }

  private async doRefresh(): Promise<boolean> {
    const res = await fetch(REFRESH_URL, {
      method: "GET",
      credentials: "include",
    });
    return res.ok;
  }
}

const refresher = new TokenRefresher();

function goSignIn() {
  const from =
    typeof window !== "undefined"
      ? window.location.pathname + window.location.search
      : "/";
  const url = new URL("/sign-in", window.location.origin);
  url.searchParams.set("from", from);
  window.location.assign(url.toString());
}

function prepareBodyAndHeaders(init: RequestInit) {
  const headers = new Headers(init.headers);
  const body = (init as any).body;

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  const isURLSearchParams =
    typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams;
  const isBlob = typeof Blob !== "undefined" && body instanceof Blob;
  const isArrayBuffer =
    typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer;
  const isTypedArray =
    ArrayBuffer.isView?.(body) && !(body instanceof DataView);
  const isReadableStream =
    typeof ReadableStream !== "undefined" && body instanceof ReadableStream;

  const callerSetCT = headers.has("Content-Type");

  if (isFormData) {
    if (callerSetCT) headers.delete("Content-Type");
    return { body, headers };
  }

  if (
    isBlob ||
    isArrayBuffer ||
    isTypedArray ||
    isReadableStream ||
    isURLSearchParams
  ) {
    return { body, headers };
  }

  if (typeof body === "string") {
    if (!callerSetCT) headers.set("Content-Type", "text/plain;charset=UTF-8");
    return { body, headers };
  }

  if (body == null) {
    return { body: undefined, headers };
  }

  if (!callerSetCT) headers.set("Content-Type", "application/json");
  const jsonBody = JSON.stringify(body);
  return { body: jsonBody, headers };
}

function isAbsoluteUrl(u: ApiInput): boolean {
  if (typeof u === "string") return /^https?:\/\//i.test(u);
  if (u instanceof URL) return !!u.protocol && !!u.host;
  return false;
}

export async function apiFetch<T = any>(
  input: ApiInput,
  init: ApiInit = {}
): Promise<T> {
  const { retryOn401 = true, parseAs, ...rest } = init;

  const url = isAbsoluteUrl(input) ? String(input) : API_BASE + String(input);

  const { body, headers } = prepareBodyAndHeaders(rest);

  const res = await fetch(url, {
    credentials: "include",
    ...rest,
    headers,
    body,
  });

  if ((res.status === 401 && retryOn401) || res.status === 400) {
    const ok = await refresher.refresh();
    if (!ok) {
      goSignIn();
      throw new Error("Unauthorized: refresh failed");
    }
    return apiFetch<T>(input, { ...init, retryOn401: false });
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  if (parseAs === "text") return (await res.text()) as unknown as T;
  if (parseAs === "blob") return (await res.blob()) as unknown as T;
  if (parseAs === "arrayBuffer")
    return (await res.arrayBuffer()) as unknown as T;

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
}
