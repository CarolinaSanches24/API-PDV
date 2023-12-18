const transportador = require("../../config/conexaoNodemailer");
const knex = require("../../config/conexaoDB");
const construirMensagemHTML = require("../../view/message");
const { consultarDadosCliente } = require("../../queries/pedidoQueries");
const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  try {
    const consultarProdutos = pedido_produtos.map(async (itemPedido) => {
      const produto = await knex("produtos")
        .select("id", "valor")
        .where({
          id: itemPedido.produto_id,
        })
        .first();

      const { valor } = produto;

      return valor * itemPedido.quantidade_produto;
    });

    const valoresProdutos = await Promise.all(consultarProdutos);

    const valorTotalPedido = valoresProdutos.reduce(
      (total, valor) => total + valor,
      0
    );

    const novoPedido = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total: valorTotalPedido,
      })
      .returning("*");

    const inserindoProdutos = pedido_produtos.map(async (itemPedido) => {
      const produto = await knex("produtos").select("id", "valor").where({
        id: itemPedido.produto_id,
      });
      return knex("pedido_produtos").insert({
        pedido_id: novoPedido[0].id,
        produto_id: itemPedido.produto_id,
        quantidade_produto: itemPedido.quantidade_produto,
        valor_produto: produto[0].valor,
      });
    });

    const resultado = await Promise.all(inserindoProdutos);

    const cliente = await knex("clientes").where({ id: cliente_id });
    const emailCliente = cliente[0].email;

    const resultadoConsultaCliente = await consultarDadosCliente(cliente_id);

    construirMensagemHTML(cliente_id)
      .then((mensagem) => {
        const emailEnviado = {
          from: "Carolina Sanches <carolinasanchestestes@gmail.com>",
          to: emailCliente,
          subject: "Pedido Efetuado com Sucesso",
          html: mensagem,
        };
        const sendMail = async () => {
          await transportador.sendMail(emailEnviado);
        };

        sendMail();
      })
      .catch((error) => {
        console.error(error.message);
      });
    return res.status(200).json({ mensagem: "Pedido cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};
module.exports = cadastrarPedido;
