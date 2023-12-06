const joi = require("joi");

const esquemaProduto = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O preenchimento do campo descrição é obrigatório",
    "string.empty": "O campo descricao não pode estar vazio",
  }),
  quantidade_estoque: joi.number().positive().required().messages({
    "any.required": "O preenchimento do campo quantidade_estoque é obrigatório",
    "number.base": "O campo quantidade_estoque deve ser um número",
    "number.positive": "O campo quantidade_estoque deve ser um número positivo",
  }),
  valor: joi.number().positive().required().messages({
    "any.required": "O preenchimento do campo valor é obrigatório",
    "number.base": "O campo valor  deve ser um número",
    "number.positive": "O campo valor  deve ser um número positivo",
  }),
  categoria_id: joi.number().positive().required().messages({
    "any.required": "O preenchimento do campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id  deve ser um número",
    "number.positive": "O campo categoria_id deve ser um número positivo",
  }),
});

module.exports = esquemaProduto;
