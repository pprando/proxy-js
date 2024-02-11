import tap from "tap";
import { obterDadosEnviados } from "../../../src/app/index.js";

tap.test("obterDadosEnviados", async (t) => {
  const req = {
    on: (event, callback) => {
      if (event === "data") {
        callback(Buffer.from("Hello"));
        callback(Buffer.from(" "));
        callback(Buffer.from("World"));
      }
      if (event === "end") {
        callback();
      }
    },
  };

  try {
    const dadosEnviados = await obterDadosEnviados(req);

    t.equal(
      dadosEnviados.toString(),
      "Hello World",
      'Os dados recebidos devem ser "Hello World"'
    );

    t.end();
  } catch (error) {
    t.error(error, "Não deve ocorrer erro");
    t.end();
  }
});
