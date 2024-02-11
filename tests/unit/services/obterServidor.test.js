import tap from "tap";
import { HttpError, obterServidor } from "../../../src/app/index.js";
import config from "../../../config.json" with { type: "json" };

tap.test(
  "obterServidor lança HttpError 400 se o sistema não for informado",
  (t) => {
    t.throws(
      () => obterServidor(),
      new HttpError(400, "Sistema não informado"),
      "Deve lançar HttpError 400 para sistema não informado"
    );
    t.end();
  }
);

tap.test(
  "obterServidor lança HttpError 404 se o sistema não estiver configurado",
  (t) => {
    const sistemaNaoConfigurado = "sistema_inexistente";
    t.throws(
      () => obterServidor(sistemaNaoConfigurado),
      new HttpError(
        404,
        `Servidor de destino do sistema "${sistemaNaoConfigurado}" não foi configurado`
      ),
      "Deve lançar HttpError 404 para sistema não configurado"
    );
    t.end();
  }
);

tap.test(
  "obterServidor retorna o servidor correto para um sistema configurado",
  (t) => {
    const sistemaConfigurado = "pedro";
    const servidorEsperado = config[sistemaConfigurado];

    const servidorRetornado = obterServidor(sistemaConfigurado);

    t.equal(
      servidorRetornado,
      servidorEsperado,
      "Deve retornar o servidor correto para um sistema configurado"
    );
    t.end();
  }
);
