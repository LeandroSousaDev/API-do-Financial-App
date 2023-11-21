const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.user_password);

    if (!validPassword) {
      return res.status(400).json({ mensagem: "Senha inválida" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "8h" });

    const { user_password, ...userLogged } = user;

    return res.status(200).json({ ...userLogged, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = loginUser;