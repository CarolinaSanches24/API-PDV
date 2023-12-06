const knex = require("../banco_de_dados/conexao");

const verificaEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailExiste = await knex("usuarios").where("email", email);

    if (emailExiste.length > 0) {
      return res
        .status(400)
        .json({ mensagem: "Email já cadastrado. Por favor, tente novamente!" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};

module.exports = verificaEmail;
