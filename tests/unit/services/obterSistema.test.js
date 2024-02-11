import tap from "tap";
import { HttpError, obterSistema } from "../../../src/app/index.js";

tap.test(
  "obterSistema lança HttpError 400 se o caminho não for informado",
  (t) => {
    t.throws(
      () => obterSistema(),
      new HttpError(400, "Requisição feita de forma incorreta"),
      "Deve lançar HttpError 400 para caminho não informado"
    );
    t.end();
  }
);

tap.test(
  "obterSistema lança HttpError 404 se o sistema não for encontrado",
  (t) => {
    // Caminho sem sistema
    const caminhoInvalido = "/";
    t.throws(
      () => obterSistema(caminhoInvalido),
      new HttpError(404, "Sistema não encontrado"),
      "Deve lançar HttpError 404 para sistema não encontrado"
    );
    t.end();
  }
);

tap.test("obterSistema retorna o sistema correto", (t) => {
  const caminhoValido = "/meu_sistema";
  const sistemaEsperado = "meu_sistema";

  const sistemaRetornado = obterSistema(caminhoValido);

  t.equal(sistemaRetornado, sistemaEsperado, "Deve retornar o sistema correto");
  t.end();
});
