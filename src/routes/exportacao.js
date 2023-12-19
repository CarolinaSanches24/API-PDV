const rotasUsuario = require("./rotasUsuario");
const rotasCategoria = require("./rotasCategoria");
const rotasProduto = require("./rotasProduto");
const rotasCliente = require("./rotasCliente");
const rotasPedido = require("./rotasPedido");
module.exports = (app) => {
  app.use(
    rotasCategoria,
    rotasUsuario,
    rotasProduto,
    rotasCliente,
    rotasPedido
  );
};
