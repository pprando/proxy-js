import { HttpError } from "./index.js";
import config from "../config.json" with { type: "json" };

export function obterServidorDestino(sistema) {
  if (!sistema) {
    throw new HttpError(400, "Sistema não informado");
  }

  const servidorDestino = config[sistema];
  if (!servidorDestino) {
    throw new HttpError(404, `Servidor destino do sistema "${sistema}" não configurado`);
  }

  return servidorDestino;
}
