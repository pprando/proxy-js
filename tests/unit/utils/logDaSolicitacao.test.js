import tap from "tap";
import { logDaSolicitacao } from "../../../src/app/index.js";

tap.test("logDaSolicitacao", (t) => {
  const req = {
    url: "/example",
    method: "GET",
  };
  const response = {
    url: "/example",
    ok: true,
    status: 200,
    statusText: "OK",
    redirected: false,
  };
  const valorEsperado = {
    sistema: "example",
    origem: `${process.env.PROXY_BASE_URL || "http://localhost:1337"}/example`,
    destino: "GET /example",
    resposta: {
      ok: true,
      status: 200,
      statusText: "OK",
      redirecionado: false,
    },
  };

  const consoleInfo = console.info;
  console.info = (tipo, valorRecebido) => {
    t.match(tipo, /INFO/);
    t.same(
      valorRecebido,
      valorEsperado,
      "valorRecebido deve ser igual ao valorEsperado"
    );
  };

  logDaSolicitacao(req, response);

  console.info = consoleInfo;

  t.end();
});
