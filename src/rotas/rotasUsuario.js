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
const {
  verificaEmailCadastrado,
  verificaEmailExiste,
} = require("../intermediarios/validacoesUsuario");
const validarCamposObrigatorios = require("../intermediarios/validarCamposObrigatorios");

rotas.post(
  "/usuario",
  verificarCamposObrigatorios(esquemaUsuario),
  verificaEmailCadastrado,
  cadastrarUsuario
);

rotas.post(
  "/login",
  verificarCamposObrigatorios(esquemaLogin),
  verificaEmailExiste,
  fazerLogin
);

rotas.get("/usuario", autenticacao, detalharUsuario);

rotas.put(
  "/usuario",
  autenticacao,
  validarCamposObrigatorios(esquemaUsuario),
  verificaEmailCadastrado,
  atualizarUsuario
);

module.exports = rotas;
