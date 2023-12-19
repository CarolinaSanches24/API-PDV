const knex = require("../../config/dataBase/conexaoDB");
const detalharUsuario = async (req, res) => {
  const { id, nome, email } = req.usuario;

  try {
    const usuario = await knex("usuarios")
      .select("id", "nome", "email")
      .where({ id });

    if (usuario) {
      return res.status(200).json(usuario);
    } else {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = detalharUsuario;
