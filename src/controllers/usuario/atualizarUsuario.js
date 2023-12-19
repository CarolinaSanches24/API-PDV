const knex = require("../../config/dataBase/conexaoDB");
const { hash } = require("bcrypt");
const atualizarUsuario = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await hash(senha, 10);

    const usuarioAtualizado = await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return res
      .status(200)
      .json({ mensagem: "Usuário foi atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = atualizarUsuario;
