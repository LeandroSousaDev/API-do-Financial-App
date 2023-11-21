const joi = require("joi");

const loginUserSchema = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.base": "O campo email deve ser do tipo string",
    "string.empty": "O campo email não pode ser vazio",
    "string.email": "O campo email deve ser um email válido"
  }),
  password: joi.string().min(8).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.base": "O campo senha deve ser do tipo string",
    "string.empty": "O campo senha não pode ser vazio",
    "string.min": "O campo senha deve ter no mínimo 8 caracteres",
  })
});

module.exports = loginUserSchema;