const knex = require("../config/conexaoDB");

const validarDadosCliente = async (req, res, next) => {
  const { email, cpf } = req.body;

  try {
    const emailClienteExiste = await knex("clientes").where({ email }).first();
    if (emailClienteExiste) {
      return res.status(400).json({
        mensagem: "Email já cadastrado. Por favor, entre com outro email!",
      });
    }
    const cpfClienteExiste = await knex("clientes").where({ cpf }).first();

    if (cpfClienteExiste) {
      return res
        .status(400)
        .json({ mensagem: "Cpf já cadastrado. Por favor, informe outro Cpf!" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};

const validarClienteExiste = async (req, res, next) => {
  const { id } = req.params;
  try {
    const clienteExistente = await knex("clientes").where({ id });

    if (clienteExistente.length === 0) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};
module.exports = {
  validarDadosCliente,
  validarClienteExiste,
};
