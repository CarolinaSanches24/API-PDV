const express = require("express");
const autenticacao = require("../intermediarios/autenticacao");
const rotas = express();

const {
  cadastrarUsuario,
  fazerLogin,
  detalharUsuario,
  atualizarUsuario,
} = require("../controladores/usuario");
const verificarCamposObrigatorios = require("../intermediarios/validarCamposObrigatorios");
const { esquemaUsuario, esquemaLogin } = require("../esquemas/esquemaUsuario");
const verificaEmail = require("../intermediarios/validacoesUsuario");
const validarCamposObrigatorios = require("../intermediarios/validarCamposObrigatorios");

rotas.post(
  "/usuario",
  verificarCamposObrigatorios(esquemaUsuario),
  verificaEmail,
  cadastrarUsuario
);

rotas.post("/login", verificarCamposObrigatorios(esquemaLogin), fazerLogin);

rotas.get("/usuario", autenticacao, detalharUsuario);

rotas.put(
  "/usuario",
  autenticacao,
  validarCamposObrigatorios(esquemaUsuario),
  verificaEmail,
  atualizarUsuario
);

module.exports = rotas;
