import { createServer } from "http";
import {
  HttpError,
  obterDadosEnviadosNaSolicitacao,
  obterDestino,
  responderCom,
  responderComErro
} from "./index.js";

export const servidorProxy = createServer(async (req, res) => {
  try {
    const destino = obterDestino(req);

    const resposta = await fetch(destino, {
      method: req.method,
      headers: req.headers,
      body: !["GET", "HEAD"].includes(req.method)
        ? await obterDadosEnviadosNaSolicitacao(req)
        : undefined,
    });

    await responderCom(req, res, resposta);
  } catch (e) {
    let [status, mensagem] = [500, "Erro interno do servidor"];
    if (e instanceof HttpError) {
      [status, mensagem] = [e.status, e.message];
    }
    console.error("#ERRO", status, e.name, mensagem, e);
    responderComErro(res, status, mensagem);
  } finally {
    res.end();
  }
});
