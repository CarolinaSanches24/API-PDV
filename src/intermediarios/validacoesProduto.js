const knex = require("../banco_de_dados/conexao");

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
module.exports = {
  verificaProdutoExiste,
  verificarExistenciaDeCategoria,
};
