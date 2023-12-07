const express = require("express");
const autenticacao = require("../intermediarios/autenticacao");
const multer = require("../intermediarios/multer");
const {
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
  listarProdutos,
  obterProduto,
} = require("../controladores/produto");
const {
  verificaProdutoExiste,
  verificarExistenciaDeCategoria,
} = require("../intermediarios/validacoesProduto");
const validarCamposObrigatorios = require("../intermediarios/validarCamposObrigatorios");
const esquemaProduto = require("../esquemas/esquemaProduto");
const rotas = express();

rotas.get("/produto", autenticacao, listarProdutos);
rotas.get("/produto/:id", autenticacao, obterProduto);
rotas.post(
  "/produto",
  autenticacao,
  // validarCamposObrigatorios(esquemaProduto),
  verificarExistenciaDeCategoria,
  multer.single("imagem"),
  cadastrarProduto
);
rotas.put(
  "/produto/:id",
  autenticacao,
  verificaProdutoExiste,
  validarCamposObrigatorios(esquemaProduto),
  verificarExistenciaDeCategoria,
  atualizarProduto
);
rotas.delete(
  "/produto/:id",
  autenticacao,
  verificaProdutoExiste,
  excluirProduto
);

module.exports = rotas;
