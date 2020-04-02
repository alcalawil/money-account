const http = require("http");
const port = Number(process.env.PORT) || 5000;
const app = require("./app");
const server = http.createServer(app);

server.listen(port);

console.log(`Server listen at port: ${port}`);
