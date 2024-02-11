import { HttpError } from "../index.js";
import config from "../../../config.json" with { type: "json" };

export function obterServidor(sistema) {
  if (!sistema) {
    throw new HttpError(400, "Sistema não informado");
  }

  const servidorDestino = config[sistema];
  if (!servidorDestino) {
    throw new HttpError(
      404,
      `Servidor de destino do sistema "${sistema}" não foi configurado`
    );
  }

  return servidorDestino;
}
