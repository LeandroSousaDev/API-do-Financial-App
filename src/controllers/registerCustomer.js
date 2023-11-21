const knex = require("../database/connection");

async function registerCustomer(req, res) {
  const { name, email, cpf, phone, cep, street, neighborhood, complement, city, country_state } = req.body;

  try {
    const emailExist = await knex("customers").where({ email }).first();

    if (emailExist) {
      return res.status(400).json({ mensagem: "Cliente já cadastrado" });
    }

    await knex("customers").insert({
      customer_name: name,
      email,
      cpf,
      phone,
      cep,
      street,
      neighborhood,
      complement,
      city,
      country_state
    });

    return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
}

module.exports = { registerCustomer };