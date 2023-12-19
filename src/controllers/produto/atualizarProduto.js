const s3 = require("../../config/aws/conexaoAWS");
const { uploadImagem, deletarImagem } = require("../../services/uploads");
const knex = require("../../config/dataBase/conexaoDB");
const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    if (req.file) {
      const { originalname, mimetype, buffer } = req.file;
      const id = req.params.id;
      const urlProduto = await knex("produtos")
        .select("produto_imagem")
        .where({ id })
        .first();

      if (urlProduto && urlProduto.produto_imagem) {
        await deletarImagem(urlProduto.produto_imagem);
      }

      const imagem = await uploadImagem(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      );

      const produtoAtualizado = await knex("produtos")
        .update({
          produto_imagem: imagem.url,
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
        })
        .where({ id })
        .returning("*");

      return res.status(200).json(produtoAtualizado);
    }

    const produto = await knex("produtos")
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = atualizarProduto;
