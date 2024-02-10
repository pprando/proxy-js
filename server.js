import { createServer } from "node:http";
import config from "./config.json" with { type: "json" };

const proxy = createServer(async (req, res) => {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", async () => {
    try {
      const { pathname, search, href } = new URL(
        req.url,
        "http://localhost:1337"
      );

      if (pathname === "/" || req.url.endsWith("/favicon.ico")) {
        res.writeHead(404);
        return res.end("#18");
      }

      const sistema = pathname.slice(1, pathname.indexOf("/", 1));

      if (!sistema) {
        console.error(`sistema nao encontrado`);
        res.writeHead(404);
        return res.end("#26");
      }

      const servidorDestino = config[sistema];
      if (!servidorDestino) {
        console.error(`servidorDestino "${servidorDestino}" nao configurado`);
        res.writeHead(404);
        return res.end("#33");
      }

      const endpointDestino = pathname.slice(sistema.length + 1);
      const destino = `${servidorDestino}${endpointDestino}${search}`;
      const resposta = await fetch(destino, {
        method: req.method,
        headers: req.headers,
        body: !["GET", "HEAD"].includes(req.method) ? body : undefined,
      });

      res.writeHead(resposta.status, resposta.statusText, {
        "Content-Type": resposta.headers.get("Content-Type"),
        // ...Array.from(resposta.headers.entries()).reduce(
        //   (acc, [key, value]) => ({ ...acc, [key]: value }),
        //   {}
        // ),
      });
      res.flushHeaders();
      const data = await resposta.arrayBuffer();
      res.write(new Uint8Array(data));

      if (process.env.NODE_ENV !== "production") {
        console.info({
          sistema,
          origem: href,
          destino: `${req.method} ${resposta.url}`,
          resposta: {
            ok: resposta.ok,
            status: resposta.status,
            statusText: resposta.statusText,
            redirecionado: resposta.redirected,
          },
        });
      }
    } catch (e) {
      console.error(e.name, e.message, e);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain" });
      }
      res.end("Erro interno do servidor");
    } finally {
      res.end();
    }
  });
});

proxy.listen(1337, "0.0.0.0", () => {
  console.log("pronto em http://localhost:1337");
});
