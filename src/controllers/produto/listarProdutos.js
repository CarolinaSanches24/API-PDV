const knex = require("../../config/dataBase/conexaoDB");
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

module.exports = listarProdutos;
