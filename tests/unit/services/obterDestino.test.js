import tap from "tap";
import { obterDestino } from "../../../src/app/index.js";

tap.test("obterDestino retorna o destino correto", (t) => {
  const entrada = {
    pathname: "/pedro/users",
    search: "?categoria=eletronicos",
  };

  const destino = obterDestino(entrada);

  t.equal(
    destino,
    "https://reqres.in/api/users?categoria=eletronicos",
    "O destino deve ser correto"
  );

  t.end();
});
