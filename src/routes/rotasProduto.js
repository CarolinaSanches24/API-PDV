const express = require("express");
const autenticacao = require("../middlewares/autenticacao");
const multer = require("../middlewares/multer");
const {
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
  listarProduto,
  detalharProduto,
} = require("../controllers/exportsControllers");
const {
  verificaProdutoExiste,
  verificarExistenciaDeCategoria,
  verificaPedidoAssociadoProduto,
} = require("../middlewares/produto/validacoesProduto");
const validarCamposObrigatorios = require("../middlewares/validarCamposObrigatorios");
const { esquemaProduto } = require("../schemas/exportacao");
const rotas = express();

rotas.get("/produto", autenticacao, listarProduto);
rotas.get("/produto/:id", autenticacao, detalharProduto);
rotas.post(
  "/produto",
  multer.single("produto_imagem"),
  autenticacao,
  validarCamposObrigatorios(esquemaProduto),
  verificarExistenciaDeCategoria,
  cadastrarProduto
);
rotas.put(
  "/produto/:id",
  multer.single("produto_imagem"),
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
  verificaPedidoAssociadoProduto,
  excluirProduto
);

module.exports = rotas;
