const joi = require("joi")

const registerCustomerSchema = joi.object({
  name: joi.string().regex(/^(?=.*[a-zA-Z]).+$/).required().messages({
    "string.base": "O campo nome deve ser do tipo string",
    "string.empty": "O campo nome não pode ser vazio",
    "any.required": "O campo nome é obrigatório",
    "string.pattern.base": "O campo nome não pode ser apenas números.",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email não pode ser vazio",
    "string.email": "O campo email deve ser um email válido",
    "string.base": "O campo email deve ser do tipo string",
  }),
  cpf: joi.string().length(11).required().messages({
    "any.required": "O campo CPF é obrigatório",
    "string.empty": "O campo CPF não pode ser vazio",
    "string.base": "O campo CPF deve ser do tipo string",
    "string.length": "O campo CPF dever ter 11 caracteres"
  }),
  phone: joi.string().max(11).required().messages({
    "any.required": "O campo telefone é obrigatório",
    "string.empty": "O campo telefone não pode ser vazio",
    "string.base": "O campo telefone deve ser do tipo string",
    "string.max": "O campo telefone dever ter no máximo 11 caracteres"
  }),
  cep: joi.string().allow(null, "").length(8).messages({
    "string.base": "O campo CEP deve ser do tipo string",
    "string.length": "O campo CEP dever ter 8 caracteres"
  }),
  street: joi.string().allow(null, "").messages({
    "string.base": "O campo logradouro deve ser do tipo string"
  }),
  complement: joi.string().allow(null, "").messages({
    "string.base": "O campo complemento deve ser do tipo string"
  }),
  neighborhood: joi.string().allow(null, "").messages({
    "string.base": "O campo bairro deve ser do tipo string"
  }),
  city: joi.string().allow(null, "").messages({
    "string.base": "O campo cidade deve ser do tipo string"
  }),
  country_state: joi.string().allow(null, "").messages({
    "string.base": "O campo estado deve ser do tipo string"
  })
})

module.exports = registerCustomerSchema;