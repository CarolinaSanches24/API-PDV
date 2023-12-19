const express = require("express");
const autenticacao = require("../middlewares/autenticacao");
const validarCamposObrigatorios = require("../middlewares/validarCamposObrigatorios");
const {
  cadastrarCliente,
  atualizarCliente,
  listarClientes,
  detalharCliente,
} = require("../controllers/exportsControllers");
const { esquemaCliente } = require("../schemas/exportacao");
const {
  validarDadosCliente,
  validarClienteExiste,
} = require("../middlewares/cliente/validacoesCliente");

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
