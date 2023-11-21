const joi = require("joi");

const schema = joi.object({
    name: joi.string().regex(/^(?=.*[a-zA-Z]).+$/).required().messages({
        "string.base": "O campo nome deve ser do tipo string",
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome não pode ser vazio",
        "string.pattern.base": "O campo nome não pode ser apenas números",
    }),
    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório",
        "string.email": "O campo email deve ser um email válido",
        "string.empty": "O campo email não pode ser vazio",
        "string.base": "o campo email deve ser do tipo string",
    }),
    password: joi.string().min(8).required().messages({
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha não pode ser vazio",
        "string.base": "O campo senha deve ser do tipo string",
        "string.min": "O campo senha deve ter no mínimo 8 caracteres"
    })
});

module.exports = schema