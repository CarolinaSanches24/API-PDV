const s3 = require("../../config/aws/conexaoAWS");
const { deletarImagem } = require("../../services/uploads");
const knex = require("../../config/dataBase/conexaoDB");
const excluirProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const urlProduto = await knex("produtos")
      .select("produto_imagem")
      .where({ id })
      .first();

    await deletarImagem(urlProduto.produto_imagem);

    await knex("produtos").where({ id }).update({
      produto_imagem: null,
    });

    await knex("produtos").where({ id }).del();

    return res.status(200).json({ mensagem: "Produto Excluído com Sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};

module.exports = excluirProduto;
