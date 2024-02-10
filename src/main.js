import { servidorProxy } from "./proxy.js";

servidorProxy.listen(1337, "0.0.0.0", () => {
  console.log("Pronto em http://localhost:1337");
});
