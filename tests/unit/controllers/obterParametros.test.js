import tap from "tap";
import { HttpError, obterParametros } from "../../../src/app/index.js";

tap.test(
  "obterParametros lança HttpError 404 para solicitação inválida",
  (t) => {
    const req = {
      url: "/",
    };
    const reqFavicon = {
      url: "/qualquercoisa/favicon.ico",
    };

    const { message: mensagemErro } = t.throws(
      () => obterParametros(req),
      new HttpError(404, req.url),
      "Deve lançar HttpError 404 para solicitação inválida"
    );

    t.equal(
      mensagemErro,
      `Nao encontrado ${req.url}`,
      "Deve retornar mensagem de erro HttpError 404 corretamente"
    );

    const { message: mensagemErroFavicon } = t.throws(
      () => obterParametros(reqFavicon),
      new HttpError(404, reqFavicon.url),
      "Deve lançar HttpError 404 para solicitação inválida"
    );

    t.equal(
      mensagemErroFavicon,
      `Nao encontrado ${reqFavicon.url}`,
      "Deve retornar mensagem de erro HttpError 404 corretamente"
    );

    t.end();
  }
);

tap.test(
  "obterParametros retorna parâmetros corretos para solicitação válida",
  (t) => {
    const req = {
      url: `${
        process.env.PROXY_BASE_URL || "http://localhost:1337"
      }/example?param1=value1&param2=value2`,
    };

    const parametros = obterParametros(req);

    t.equal(
      parametros.pathname,
      "/example",
      "Deve retornar o pathname correto"
    );
    t.equal(
      parametros.search,
      "?param1=value1&param2=value2",
      "Deve retornar a search correto"
    );
    t.equal(
      parametros.href,
      `${
        process.env.PROXY_BASE_URL || "http://localhost:1337"
      }/example?param1=value1&param2=value2`,
      "Deve retornar o href correto"
    );

    t.end();
  }
);
