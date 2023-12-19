const knex = require("../../config/conexaoDB");
const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    await knex("clientes")
      .where({ id })
      .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });

    return res
      .status(200)
      .json({ mensagem: "Dados do cliente atualizados com sucesso." });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor! " });
  }
};

module.exports = atualizarCliente;
