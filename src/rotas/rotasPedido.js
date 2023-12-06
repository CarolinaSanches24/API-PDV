const express = require("express");
const autenticacao = require("../intermediarios/autenticacao");
const validacaoPedido = require("../intermediarios/validacoesPedido");
const validarCamposObrigatorios = require("../intermediarios/validarCamposObrigatorios");
const { cadastrarPedido } = require("../controladores/pedido");
const esquemaPedido = require("../esquemas/esquemaPedido");
const rotas = express();

rotas.post(
  "/pedido",
  autenticacao,
  validarCamposObrigatorios(esquemaPedido),
  validacaoPedido,
  cadastrarPedido
);
module.exports = rotas;
