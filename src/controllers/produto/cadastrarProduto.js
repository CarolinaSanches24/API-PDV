const s3 = require("../../config/aws/conexaoAWS");
const { uploadImagem } = require("../../services/uploads");
const knex = require("../../config/dataBase/conexaoDB");
const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    let produto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");
    if (req.file) {
      const { originalname, mimetype, buffer } = req.file;
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
      return res.status(201).json(produto);
    }
    return res.status(201).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = cadastrarProduto;
