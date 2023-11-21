const joi = require('joi');

const registerChargeSchema = joi.object({
  id_customer: joi.number().required().messages({
    "any.required": "O campo id_customer é obrigatório.",
    "number.base": "O campo id_customer deve ser um número."
  }),
  description: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatório",
    "string.empty": "O campo descrição não pode ser vazio",
    "string.base": "O campo descrição deve ser do tipo string",
  }),
  charge_value: joi.number().required().messages({
    "any.required": "O campo valor da cobrança é obrigatório",
    "number.base": "O campo valor da cobrança deve ser um número."
  }),
  due_date: joi.date().required().messages({
    "any.required": "O campo data de vencimento é obrigatório.",
    "date.base": "O campo data de vencimento deve ser do tipo date."
  }),
  status: joi.string().required().messages({
    "any.required": "O campo status é obrigatório.",
    "string.empty": "O campo status não pode ser vazio",
    "string.base": "O campo status deve ser do tipo string",
  })
});

module.exports = registerChargeSchema;