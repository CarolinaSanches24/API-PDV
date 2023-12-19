const knex = require("../../config/dataBase/conexaoDB");

const verificaEmailCadastrado = async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailCadastrado = await knex("usuarios").where({ email });

    if (emailCadastrado.length > 0) {
      return res
        .status(400)
        .json({ mensagem: "Email já cadastrado. Por favor, tente novamente!" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};
const verificaEmailExiste = async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailExiste = await knex("usuarios").where({ email }).first();

    if (!emailExiste) {
      return res.status(400).json({
        mensagem: "Email ou senha Inválidos. Por favor, tente novamente!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor!" });
  }
};

module.exports = { verificaEmailCadastrado, verificaEmailExiste };
