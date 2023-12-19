const joi = require("joi");

const esquemaCliente = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode estar vazio",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email  não pode estar vazio",
    "string.email": "O campo email precisa ter um formato válido",
  }),
  cpf: joi.string().required().messages({
    "any.required": "O campo cpf é obrigatório",
    "string.empty": "O campo cpf  não pode estar vazio",
  }),
  cep: joi.string(),
  rua: joi.string(),
  numero: joi.string(),
  bairro: joi.string(),
  cidade: joi.string(),
  estado: joi.string(),
});

module.exports = esquemaCliente;
