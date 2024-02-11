import { obterSistema } from "../index.js";

export function logDaSolicitacao(
  req,
  { url, ok, status, statusText, redirected }
) {
  if (process.env.NODE_ENV !== "production") {
    const { href } = new URL(
      req.url,
      process.env.PROXY_BASE_URL || "http://localhost:1337"
    );
    console.info("INFO", {
      sistema: obterSistema(req.url),
      origem: href,
      destino: `${req.method} ${url}`,
      resposta: {
        ok: ok,
        status: status,
        statusText: statusText,
        redirecionado: redirected,
      },
    });
  }
}
