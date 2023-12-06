require("dotenv").config();
const rotas = require("./rotas/exportacao");
const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

rotas(server);

const porta = process.env.PORT;
server.listen(porta, () => {
  console.log(`Servidor ouvindo a porta ${porta}`);
});
