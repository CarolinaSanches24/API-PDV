const express = require("express");
const autenticacao = require("../middlewares/autenticacao");
const validacaoPedido = require("../middlewares/pedido/validacoesPedido");
const validarCamposObrigatorios = require("../middlewares/validarCamposObrigatorios");

const { esquemaPedido } = require("../schemas/exportacao");
const {
  cadastrarPedido,
  listarPedidos,
} = require("../controllers/exportsControllers");
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
