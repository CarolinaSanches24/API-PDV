const knex = require("../../config/dataBase/conexaoDB");
const validacaoPedido = async (req, res, next) => {
  const { cliente_id, pedido_produtos } = req.body;
  try {
    const cliente = await knex("clientes").where({ id: cliente_id }).first();

    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    if (pedido_produtos.length === 0) {
      return res.status(400).json({
        mensagem: "O pedido deverá conter ao menos um produto ",
      });
    }

    const produtosNaoEncontrados = [];

    for (const itemPedido of pedido_produtos) {
      const produto = await knex("produtos")
        .where({ id: itemPedido.produto_id })
        .first();

      if (!produto) {
        produtosNaoEncontrados.push(itemPedido.produto_id);
      } else if (itemPedido.quantidade_produto > produto.quantidade_estoque) {
        return res
          .status(400)
          .json({ mensagem: "Quantidade do produto no estoque Insuficiente" });
      }
    }
    if (produtosNaoEncontrados.length > 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = validacaoPedido;
