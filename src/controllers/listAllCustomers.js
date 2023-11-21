const knex = require('./../database/connection');

async function listAllCustomers(req, res) {

  try {
    const allCustomers = await knex('customers')
      .select('customers.id', 'customers.customer_name', 'customers.email', 'customers.cpf', 'customers.phone')
      .leftJoin('charges', 'customers.id', 'charges.id_customer')
      .select(knex.raw("CASE WHEN NOT EXISTS (SELECT 1 FROM charges WHERE id_customer = customers.id AND status = 'Pendente' AND charges.due_date < CURRENT_DATE) THEN 'Em dia' ELSE 'Inadimplente' END AS status"))
      .groupBy('customers.id');

    return res.status(200).json(allCustomers);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
}

module.exports = listAllCustomers;