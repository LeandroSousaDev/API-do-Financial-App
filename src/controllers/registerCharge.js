const knex = require('./../database/connection');

async function registerCharge(req, res) {
  const { id_customer, description, charge_value, due_date, status } = req.body;

  try {

    const customerExist = await knex('customers').where('id', id_customer).first();

    if (!customerExist) {
      return res.status(404).json({ mensagem: "Este ID não corresponde a nenhum cliente na base de dados." })
    }

    await knex('charges').insert({
      id_customer,
      description,
      charge_value,
      due_date,
      status
    });

    return res.status(201).json({ mensagem: 'Cobrança cadastrada com sucesso.' });

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = registerCharge;