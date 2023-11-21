const knex = require('./../database/connection');

async function listAllCharges(req, res) {
  try {
    const allCharges = await knex('charges')
    .select(
      'charges.id AS id_charge',
      'customers.customer_name AS customer_name',
      'charges.charge_value',
      'charges.description',
      'charges.due_date',
      knex.raw(
        "CASE WHEN charges.status = 'Pendente' AND charges.due_date < CURRENT_DATE THEN 'Vencida' ELSE charges.status END AS status"
      )
    )
    .innerJoin('customers', 'charges.id_customer', 'customers.id');

    return res.status(200).json(allCharges)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
}

module.exports = listAllCharges;