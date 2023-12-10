const transportador = require("../config/conexaoNodemailer");
const knex = require("../banco_de_dados/conexao");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  let valorTotalPedido = 0;
  try {
    for (const itemPedido of pedido_produtos) {
      const produto = await knex("produtos").select("id", "valor").where({
        id: itemPedido.produto_id,
      });

      const valorProduto = produto[0].valor * itemPedido.quantidade_produto;
      valorTotalPedido += valorProduto;
    }
    const novoPedido = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total: valorTotalPedido,
      })
      .returning("*");

    for (const itemPedido of pedido_produtos) {
      const produto = await knex("produtos").select("id", "valor").where({
        id: itemPedido.produto_id,
      });
      await knex("pedido_produtos").insert({
        pedido_id: novoPedido[0].id,
        produto_id: itemPedido.produto_id,
        quantidade_produto: itemPedido.quantidade_produto,
        valor_produto: produto[0].valor,
      });
    }

    const cliente = await knex("clientes").where({ id: cliente_id });
    const emailCliente = cliente[0].email;

    const emailEnviado = {
      from: "Carolina Sanches <carolinasanchestestes@gmail.com>",
      to: emailCliente,
      subject: "Pedido Efetuado com Sucesso",
      text: "Tudo certo com seu Pedido , volte sempre",
    };
    const sendMail = async () => {
      await transportador.sendMail(emailEnviado);
    };

    sendMail();

    return res.status(200).json({ mensagem: "Pedido cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};
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
module.exports = {
  cadastrarPedido,
  listarPedidos,
};
