const joi = require("joi");

const esquemaPedido = joi.object({
  cliente_id: joi.number().positive().required().messages({
    "any.required": "O campo cliente_id é obrigatório",
    "number.base": "O campo cliente_id deve ser um número",
    "number.positive": "O campo cliente_id deve ser um número positivo",
  }),
  observacao: joi.string().messages({
    "string.base": "O campo observacao deve ser um texto",
  }),
  pedido_produtos: joi
    .array()
    .items(
      joi.object({
        produto_id: joi.number().positive().required().messages({
          "any.required": "O campo  produto_id é obrigatório",
          "number.base": "O campo produto_id deve ser um número",
          "number.positive": "O campo produto_id deve ser um número positivo",
        }),
        quantidade_produto: joi.number().positive().required().messages({
          "any.required": "O campo quantidade_produto é obrigatório",
          "number.base": "O campo quantidade_produto deve ser um número",
          "number.positive":
            "O campo quantidade_produto deve ser um número positivo",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "O campo pedido_produtos é obrigatório",
    }),
});

module.exports = esquemaPedido;
