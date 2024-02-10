import { HttpError } from "./index.js";

export function obterSistema(caminho) {
  if (!caminho) {
    throw new HttpError(400, "Requisição feita de forma incorreta");
  }

  const [, sistema] = caminho.split("/");

  if (!sistema) {
    throw new HttpError(404, "Sistema não encontrado");
  }

  return sistema;
}
