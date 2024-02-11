import tap from "tap";
import { responderComErro } from "../../../src/app/index.js";

tap.test("responderComErro responde com o status e mensagem corretos", (t) => {
  const mockResponse = {
    headersSent: false,
    writeHead: (status, headers) => {
      t.equal(status, 500, "Deve definir o status corretamente");
      t.equal(
        headers["Content-Type"],
        "text/plain",
        "Deve definir o Content-Type corretamente"
      );
    },
    end: (mensagem) => {
      t.match(
        mensagem,
        /500 Erro interno do servidor/,
        "Deve enviar a mensagem de erro correta"
      );
      t.end();
    },
  };

  responderComErro(mockResponse);
});
