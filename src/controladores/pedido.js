const transportador = require("../../config/conexaoNodemailer");
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

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = {
  cadastrarPedido,
};
