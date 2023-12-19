const express = require("express");
const autenticacao = require("../middlewares/autenticacao");
const validacaoPedido = require("../middlewares/pedido/validacoesPedido");
const validarCamposObrigatorios = require("../middlewares/validarCamposObrigatorios");

const { esquemaPedido } = require("../schemas/exportacao");
const cadastrarPedido = require("../controllers/pedido/cadastrarPedido");
const listarPedidos = require("../controllers/pedido/listarPedido");
const rotas = express();

rotas.post(
  "/pedido",
  autenticacao,
  validarCamposObrigatorios(esquemaPedido),
  validacaoPedido,
  cadastrarPedido
);

rotas.get("/pedido", listarPedidos);
module.exports = rotas;
