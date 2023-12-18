const { consultarDadosCliente } = require("../queries/pedidoQueries");

async function construirMensagemHTML(cliente_id) {
  try {
    const dadosCliente = await consultarDadosCliente(cliente_id);

    const mensagem = `
          <!DOCTYPE html>
          <html>
          <head>
          <style>
          .num_pedido{
            font-size:20px;
            color:blue;
          }
          .nome_cliente{
            font-size:20px;
            color:orange;
          }
          </style>
          </head>
          <body>
            <p class="nome_cliente">Olá , ${dadosCliente.nome}</p>
            <p style="text-align: center;"><strong>Obrigada por Comprar Conosco!</strong></p>
            <p><strong>
            <img style="display: block; margin-left: auto; margin-right: auto;" src="https://static.vecteezy.com/ti/vetor-gratis/p3/13258779-conceito-de-compras-online-carrinho-como-carrinho-de-compras-no-celular-gratis-vetor.jpg" alt="conceito de compras online, carrinho como carrinho de compras no celular.  13258779 Vetor no Vecteezy" width="388" height="388" />
            </strong></p>
          </body>
          </html>
        `;

    return mensagem;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

module.exports = construirMensagemHTML;
