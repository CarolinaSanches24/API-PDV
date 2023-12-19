const knex = require("../../config/dataBase/conexaoDB");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const fazerLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const senhaCriptografada = await knex("usuarios")
      .select("senha")
      .where({ email })
      .first();

    const senhaValida = await compare(senha, senhaCriptografada.senha);

    if (!senhaValida) {
      return res.status(400).json({
        mensagem: "Email ou senha inválidos. Por favor, tente novamente!",
      });
    }

    const usuario = await knex("usuarios")
      .select("id", "nome", "email")
      .where({ email })
      .first();

    const idUsuarioLogado = usuario.id;

    const senhaJwt = process.env.senhaJwt;
    const token = jwt.sign({ id: idUsuarioLogado }, senhaJwt, {
      expiresIn: "8h",
    });

    const usuarioLogado = {
      usuario,
      token,
    };

    return res.status(200).json(usuarioLogado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = fazerLogin;
