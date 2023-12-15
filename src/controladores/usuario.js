const knex = require("../config/conexaoDB");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = {
  cadastrarUsuario,
  fazerLogin,
  detalharUsuario,
  atualizarUsuario,
};
