const express = require("express");
const autenticacao = require("../intermediarios/autenticacao");
const validacaoPedido = require("../intermediarios/validacoesPedido");
const validarCamposObrigatorios = require("../intermediarios/validarCamposObrigatorios");

const esquemaPedido = require("../esquemas/esquemaPedido");
const cadastrarPedido = require("../controladores/pedido/cadastrarPedido");
const listarPedidos = require("../controladores/pedido/listarPedido");
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
