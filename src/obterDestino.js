import {
  obterParametros,
  obterServidorDestino,
  obterSistema,
} from "./index.js";

export function obterDestino(req) {
  const { pathname, search } = obterParametros(req);
  const sistema = obterSistema(pathname);
  const servidorDestino = obterServidorDestino(sistema);
  const endpointDestino = pathname.slice(sistema.length + 1);
  return `${servidorDestino}${endpointDestino}${search}`;
}
