import tap from "tap";
import { HttpError } from "../../../src/app/index.js";

tap.test("HttpError deve ser instanciado corretamente", (t) => {
  const status = 404;
  const mensagem = "Página não encontrada";

  const httpError = new HttpError(status, mensagem);

  t.equal(httpError.status, status, "O status deve ser definido corretamente");
  t.equal(
    httpError.message,
    mensagem,
    "A mensagem deve ser definida corretamente"
  );

  t.end();
});
