const knex = require("../database/connection");

const bcrypt = require("bcrypt");

const listUser = async (req, res) => {
  const { id } = req.user;

  const user = await knex("users").where({ id }).first();

  if (!user) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  const { user_password: _, ...userData } = user;

  return res.status(200).json(userData);
};

const updateUser = async (req, res) => {
  const { name, email, password, cpf, phone } = req.body;

  const { id } = req.user;

  try {
    const userExist = await knex("users").where({ id });

    if (!userExist) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    let passwordEncrypted;

    if (password) {
      passwordEncrypted = await bcrypt.hash(password, 10);
    }

    const emailExist = await knex("users").where({ email });

    if (emailExist && email !== req.user.email) {
      return res.status(400).json({ mensagem: "O Email já existe ou não pertence ao usuário autenticado" });
    }

    const userUpdated = {
      user_name: name,
      email,
      user_password: passwordEncrypted,
      cpf,
      phone
    };

    await knex("users").where({ id }).update(userUpdated);

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor"});
  }
};

module.exports = {
  listUser,
  updateUser
};
