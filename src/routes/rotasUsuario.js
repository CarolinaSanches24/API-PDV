const express = require("express");
const autenticacao = require("../middlewares/autenticacao");
const rotas = express();

const {
  cadastrarUsuario,
  fazerLogin,
  detalharUsuario,
  atualizarUsuario,
} = require("../controllers/exportsControllers");
const verificarCamposObrigatorios = require("../middlewares/validarCamposObrigatorios");
const { esquemaUsuario, esquemaLogin } = require("../schemas/exportacao");
const {
  verificaEmailCadastrado,
  verificaEmailExiste,
} = require("../middlewares/usuario/validacoesUsuario");
const validarCamposObrigatorios = require("../middlewares/validarCamposObrigatorios");

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
