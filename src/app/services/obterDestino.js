import { obterServidor, obterSistema } from "../index.js";

export function obterDestino({ pathname, search }) {
  const sistema = obterSistema(pathname);
  const servidorDestino = obterServidor(sistema);
  const endpointDestino = pathname.slice(sistema.length + 1);
  return `${servidorDestino}${endpointDestino}${search}`;
}
