const knex = require("../banco_de_dados/conexao");
const s3 = require("../config/conexaoAWS");
const { uploadImagem, deletarImagem } = require("../services/uploads");
const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;
  try {
    const produtos = await knex
      .select("id", "descricao", "quantidade_estoque", "valor", "categoria_id")
      .from("produtos");

    if (categoria_id) {
      const categoriaExiste = await knex("categorias").where({
        id: categoria_id,
      });
      if (categoriaExiste.length === 0) {
        return res.status(404).json({ mensagem: "Categoria não encontrada" });
      }
      const listaProdutosPorCategoria = await knex("produtos").where({
        categoria_id,
      });
      return res.status(200).json(listaProdutosPorCategoria);
    }
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const obterProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex
      .select("*")
      .from("produtos")
      .where({ id: id })
      .first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { originalname, mimetype, buffer } = req.file;
  try {
    let produto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    const id = produto[0].id;

    const imagem = await uploadImagem(
      `produtos/${id}/${originalname}`,
      buffer,
      mimetype
    );
    produto = await knex("produtos")
      .update({
        produto_imagem: imagem.url,
      })
      .where({ id })
      .returning("*");
    return res.status(200).json(produto);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const atualizarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;

  try {
    const produto = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    };

    const atualizacaoDeProduto = await knex("produtos")
      .update(produto)
      .where({ id });

    return res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await knex("produtos").where({ id }).del();
    return res.status(200).json({ mensagem: "Produto excluido com Sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};

module.exports = {
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
  listarProdutos,
  obterProduto,
};