const listarCategorias = require("./categoria/listarCategorias");
const listarClientes = require("../controllers/cliente/listarClientes");
const cadastrarCliente = require("../controllers/cliente/cadastrarCliente");
const atualizarCliente = require("../controllers/cliente/atualizarCliente");
const detalharCliente = require("../controllers/cliente/detalharCliente");
const cadastrarPedido = require("../controllers/pedido/cadastrarPedido");
const listarPedidos = require("../controllers/pedido/listarPedido");
module.exports = {
  listarCategorias,
  listarClientes,
  cadastrarCliente,
  atualizarCliente,
  detalharCliente,
  cadastrarPedido,
  listarPedidos,
};
