import { logDaSolicitacao } from "../index.js";

export async function responderCom(req, res, resposta) {
  const { status, statusText, headers } = resposta;

  res.writeHead(status, statusText, {
    "Content-Type": headers.get("Content-Type"),
  });
  res.flushHeaders();

  const data = await resposta.arrayBuffer();
  res.write(new Uint8Array(data));

  logDaSolicitacao(req, resposta);
}
