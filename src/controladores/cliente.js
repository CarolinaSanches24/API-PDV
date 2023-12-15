const knex = require("../config/conexaoDB");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const novoCliente = await knex("clientes").insert({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });
    return res
      .status(201)
      .json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

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

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes");

    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex("clientes").where({ id });

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor! " });
  }
};

module.exports = {
  cadastrarCliente,
  atualizarCliente,
  listarClientes,
  detalharCliente,
};
