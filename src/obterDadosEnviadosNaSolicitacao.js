export async function obterDadosEnviadosNaSolicitacao(req) {
  return new Promise((resolve, reject) => {
    let dadosEnviados = [];
    req.on("data", (chunk) => dadosEnviados.push(chunk));
    req.on("end", () => resolve(Buffer.concat(dadosEnviados)));
    req.on("error", reject);
  });
}
