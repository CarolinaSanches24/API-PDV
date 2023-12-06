const express = require("express");
const autenticacao = require("../intermediarios/autenticacao");
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
  validarCamposObrigatorios(esquemaProduto),
  verificarExistenciaDeCategoria,
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
