const knex = require("../../config/dataBase/conexaoDB");

const verificaProdutoExiste = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produto = await knex("produtos").where({ id }).first();
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};
const verificarExistenciaDeCategoria = async (req, res, next) => {
  const { categoria_id } = req.body;
  try {
    const verificarExistenciaDeCategoria = await knex("categorias").where({
      id: categoria_id,
    });
    if (verificarExistenciaDeCategoria.length == 0) {
      return res.status(404).json({ mensagem: "categoria_id inexistente" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const verificaPedidoAssociadoProduto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedido = await knex("pedido_produtos")
      .where({ produto_id: id })
      .first();
    if (pedido) {
      return res.status(400).json({
        mensagem: "Não foi possível excluir produto associado a um pedido",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};
module.exports = {
  verificaProdutoExiste,
  verificarExistenciaDeCategoria,
  verificaPedidoAssociadoProduto,
};
