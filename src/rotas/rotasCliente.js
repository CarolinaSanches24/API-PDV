const express = require("express");
const autenticacao = require("../intermediarios/autenticacao");
const validarCamposObrigatorios = require("../intermediarios/validarCamposObrigatorios");
const {
  cadastrarCliente,
  atualizarCliente,
  listarClientes,
  detalharCliente,
} = require("../controladores/cliente");
const esquemaCliente = require("../esquemas/esquemaCliente");
const {
  validarDadosCliente,
  validarClienteExiste,
} = require("../intermediarios/validacoesCliente");

const rotas = express();

rotas.post(
  "/cliente",
  autenticacao,
  validarCamposObrigatorios(esquemaCliente),
  validarDadosCliente,
  cadastrarCliente
);
rotas.put(
  "/cliente/:id",
  autenticacao,
  validarCamposObrigatorios(esquemaCliente),
  validarDadosCliente,
  validarClienteExiste,
  atualizarCliente
);

rotas.get("/clientes", autenticacao, listarClientes);
rotas.get("/cliente/:id", autenticacao, validarClienteExiste, detalharCliente);

module.exports = rotas;
