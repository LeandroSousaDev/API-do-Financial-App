require("dotenv").config();

const knex = require("../database/connection");

const jwt = require("jsonwebtoken");

async function validationLogin(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const userExist = await knex("users").where({ id }).first();

    if (!userExist) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const { user_password, ...userData } = userExist;

    req.user = userData;

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

module.exports = validationLogin;