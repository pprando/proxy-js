import { createServer } from "node:http";
import * as app from "./app/index.js";

export const servidorProxy = createServer(async (req, res) => {
  try {
    const parametros = app.obterParametros(req);
    const destino = app.obterDestino(parametros);
    const resposta = await fetch(destino, {
      method: req.method,
      headers: req.headers,
      body: !["GET", "HEAD"].includes(req.method)
        ? await app.obterDadosEnviados(req)
        : undefined,
    });
    await app.responderCom(req, res, resposta);
  } catch (e) {
    let [status, mensagem] = [500, "Erro interno do servidor"];
    if (e instanceof app.HttpError) {
      [status, mensagem] = [e.status, e.message];
    }
    console.error(e);
    app.responderComErro(res, status, mensagem);
  } finally {
    res.end();
  }
});
