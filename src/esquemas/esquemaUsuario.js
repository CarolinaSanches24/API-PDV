const joi = require("joi");

const esquemaUsuario = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode estar vazio",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email  não pode estar vazio",
    "string.email": "O campo email precisa ter um formato válido",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha  não pode estar vazio",
    "string.min": "A senha precisa conter, no mínimo, 5 caracteres",
  }),
});

const esquemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email  não pode estar vazio",
    "string.email": "O campo email precisa ter um formato válido",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha  não pode estar vazio",
    "string.min": "A senha precisa conter, no mínimo, 5 caracteres",
  }),
});

module.exports = {
  esquemaUsuario,
  esquemaLogin,
};
