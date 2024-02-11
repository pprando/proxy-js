import tap from "tap";
import { responderCom } from "../../../src/app/index.js";

tap.test("responderCom escreve a resposta corretamente", async (t) => {
  const req = { method: "GET", url: "/pedro/users" };
  const res = {
    writeHead: (status, statusText, headers) => {
      t.equal(status, 200, "Deve definir o status corretamente");
      t.equal(statusText, "OK", "Deve definir o statusText corretamente");
      t.equal(
        headers["Content-Type"],
        "application/json",
        "Deve definir o Content-Type corretamente"
      );
    },
    flushHeaders: () => {},
    write: (data) => {
      const textoData = new TextDecoder().decode(data);
      t.equal(textoData, "Hello World", "Deve escrever os dados corretamente");
    },
  };
  const resposta = {
    ok: true,
    status: 200,
    statusText: "OK",
    redirected: false,
    headers: new Map([["Content-Type", "application/json"]]),
    arrayBuffer: async () => {
      return new TextEncoder().encode("Hello World").buffer;
    },
  };

  const consoleInfo = console.info;
  console.info = () => {};

  await responderCom(req, res, resposta);

  console.info = consoleInfo;

  t.end();
});
