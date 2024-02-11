export async function responderComErro(
  res,
  status = 500,
  mensagem = "Erro interno do servidor"
) {
  if (!res.headersSent) {
    res.writeHead(status, { "Content-Type": "text/plain" });
  }
  res.end(mensagem);
}
