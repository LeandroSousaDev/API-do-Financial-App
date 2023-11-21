const knex = require("../database/connection");

const updateCustomer = async (req, res) => {
  const { name, email, cpf, phone, cep, street, neighborhood, complement, city, country_state } = req.body;

  const { id } = req.params;

  try {
    const customerExist = await knex("customers").where({ id }).first();

    if (!customerExist) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const customerEmailExist = await knex("customers").whereNot({ id }).andWhere({ email }).first();

    if (customerEmailExist) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const customerEmailIsValid = await knex("customers").where({ id }).andWhere({ email }).first();

    if (!customerEmailIsValid) {
      return res.status(400).json({ mensagem: "O email não pertence a este usuário" });
    }

    const customerCpfExist = await knex("customers").whereNot({ id }).andWhere({ cpf }).first();

    if (customerCpfExist) {
      return res.status(400).json({ mensagem: "CPF já cadastrado" });
    }

    const customerCpfIsValid = await knex("customers").where({ id }).andWhere({ cpf }).first();

    if (!customerCpfIsValid) {
      return res.status(400).json({ mensagem: "O CPF não pertence a este usuário" });
    }

    await knex("customers").where({ id }).update({ 
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
    
    return res.status(200).json({ mensagem: "Cliente atualizado com sucesso"});
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  updateCustomer
};