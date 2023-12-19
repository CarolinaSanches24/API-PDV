const listarCategorias = require("./categoria/listarCategorias");

const listarClientes = require("../controllers/cliente/listarClientes");
const cadastrarCliente = require("../controllers/cliente/cadastrarCliente");
const atualizarCliente = require("../controllers/cliente/atualizarCliente");
const detalharCliente = require("../controllers/cliente/detalharCliente");

const cadastrarPedido = require("../controllers/pedido/cadastrarPedido");
const listarPedidos = require("../controllers/pedido/listarPedido");

const cadastrarProduto = require("../controllers/produto/cadastrarProduto");
const atualizarProduto = require("../controllers/produto/atualizarProduto");
const detalharProduto = require("../controllers/produto/detalharProduto");
const listarProduto = require("../controllers/produto/listarProdutos");
const excluirProduto = require("../controllers/produto/excluirProduto");

const cadastrarUsuario = require("../controllers/usuario/cadastrarUsuario");
const atualizarUsuario = require("../controllers/usuario/atualizarUsuario");
const detalharUsuario = require("../controllers/usuario/detalharUsuario");
const fazerLogin = require("../controllers/usuario/fazerLogin");

module.exports = {
  listarCategorias,
  listarClientes,
  cadastrarCliente,
  atualizarCliente,
  detalharCliente,
  cadastrarPedido,
  listarPedidos,
  cadastrarProduto,
  atualizarProduto,
  detalharProduto,
  excluirProduto,
  listarProduto,
  cadastrarUsuario,
  atualizarUsuario,
  detalharUsuario,
  fazerLogin,
};
