const knex = require("../config/dataBase/conexaoDB");
const jwt = require("jsonwebtoken");

const autenticacao = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Não autorizado");
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const senhaJwt = process.env.senhaJwt;
    const { id } = jwt.verify(token, senhaJwt);

    const usuarioExiste = await knex("usuarios").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json("Token Inválido");
    }

    const { senha, ...usuario } = usuarioExiste;

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = autenticacao;
