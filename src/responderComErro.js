export async function responderComErro(res, status, mensagem) {
  if (!res.headersSent) {
    res.writeHead(status, { "Content-Type": "text/plain" });
  }
  res.end(mensagem);
}
