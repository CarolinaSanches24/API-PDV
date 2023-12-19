const knex = require("../config/dataBase/conexaoDB");

async function consultarDadosCliente(cliente_id) {
  try {
    const dadosCliente = await knex("clientes")
      .select("nome")
      .where({ id: cliente_id })
      .first();

    return dadosCliente;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

module.exports = {
  consultarDadosCliente,
};
