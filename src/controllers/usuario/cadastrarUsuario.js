const knex = require("../../config/dataBase/conexaoDB");
const { hash } = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await hash(senha, 10);

    const novoUsuario = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    const cadastroDeNovoUsuario = await knex("usuarios").insert(novoUsuario);

    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = cadastrarUsuario;
