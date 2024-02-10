import { HttpError } from "./index.js";

export function obterParametros(req) {
  const { pathname, search, href } = new URL(
    req.url,
    process.env.PROXY_BASE_URL || "http://localhost:1337"
  );

  if (pathname === "/" || req.url.endsWith("/favicon.ico")) {
    throw new HttpError(404);
  }

  return { pathname, search, href };
}
