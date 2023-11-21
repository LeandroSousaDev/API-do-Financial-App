const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().regex(/^(?=.*[a-zA-Z]).+$/).required().messages({
    "string.base": "o campo nome deve ser do tipo string",
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode ser vazio",
    "string.pattern.base": "O campo nome não pode conter números"
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.email": "O campo email deve ser um email válido",
    "string.empty": "O campo email não pode ser vazio",
    "string.base": "o campo email deve ser do tipo string"
  }),
  password: joi.string().min(8).messages({
    "string.base": "O campo senha deve ser do tipo string",
    "string.empty": "O campo senha não pode ser vazio",
    "string.min": "O campo senha deve ter no mínimo 8 caracteres"
  }),
  cpf: joi.string().allow(null, "").length(11).messages({
    "string.base": "O campo cpf deve ser do tipo string",
    "string.length": "O campo cpf deve ter 11 caracteres"
  }),
  phone: joi.string().allow(null, "").max(11).messages({
    "string.base": "O campo telefone deve ser do tipo string",
    "string.max": "O campo telefone deve ter no máximo 11 caracteres"
  })
});

module.exports = userSchema;
