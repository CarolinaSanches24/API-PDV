const knex = require("../../config/dataBase/conexaoDB");
const listarPedidos = async (req, res) => {
  try {
    let query = await knex("pedidos");
    let listarPedidosProdutos = await knex("pedido_produtos");

    const { cliente_id } = req.query;

    if (cliente_id) {
      const pedidoCliente = await knex("pedidos").where({ cliente_id });

      if (pedidoCliente.length === 0) {
        return res.status(404).json({ mensagem: "Cliente não encontrado!" });
      }

      const listagemComFiltro = pedidoCliente.map((pedido) => {
        const pedidoProdutos = listarPedidosProdutos.filter(
          (item) => item.pedido_id === pedido.id
        );

        return {
          pedido: {
            id: pedido.id,
            valor_total: pedido.valor_total,
            observacao: pedido.observacao,
            cliente_id: pedido.cliente_id,
          },
          pedido_produtos: pedidoProdutos.map((produto) => ({
            id: produto.id,
            quantidade_produto: produto.quantidade_produto,
            valor_produto: produto.valor_produto,
            pedido_id: produto.pedido_id,
            produto_id: produto.produto_id,
          })),
        };
      });

      return res.status(200).json(listagemComFiltro);
    }

    const pedidos = query;

    const listagem = pedidos.map((pedido) => {
      const pedidoProdutos = listarPedidosProdutos.filter(
        (item) => item.pedido_id === pedido.id
      );

      return {
        pedido: {
          id: pedido.id,
          valor_total: pedido.valor_total,
          observacao: pedido.observacao,
          cliente_id: pedido.cliente_id,
        },
        pedido_produtos: pedidoProdutos.map((produto) => ({
          id: produto.id,
          quantidade_produto: produto.quantidade_produto,
          valor_produto: produto.valor_produto,
          pedido_id: produto.pedido_id,
          produto_id: produto.produto_id,
        })),
      };
    });

    return res.json(listagem);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};
module.exports = listarPedidos;
