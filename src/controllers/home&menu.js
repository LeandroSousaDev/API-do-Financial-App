const knex = require("../database/connection");

async function requestCharges(req, res) {
  const { type_charge } = req.query;
  const { id } = req.user;

  try {
    const charges = await knex("charges")
      .select("customers", "charges.id", "charges.valor")
      .where({ type_charge })
      .andWhere({ id })
      .join("charges", "customers.id", "charges.customer_id")

    return res.status(200).json(charges);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function requestTotalAmount(req, res) {
  const { id } = req.user;
  const { type_charge } = req.query;

  try {
    const totalAmountCharge = await knex("charges")
      .where("customer_id", id)
      .andWhere({ type_charge })
      .sum("amount");

    return res.status(200).json(totalAmountCharge);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function countCharges(req, res) {
  const { type_charge } = req.query;

  try {
    const quantityCharges = await knex("charges")
      .where("customer_id", id)
      .count({ type_charge });

    return res.status(200).json(quantityCharges);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function defeatedCustomers(req, res) {
  const { id } = req.user;

  try {
    const defaultersCustomers = await knex("customers")
      .select("customer_name", "id", "cpf")
      .innerJoin("charges", "customers.id", "charges.customer_id")
      .where("type_charge", "defeated")
      .andWhere("customer_id", id)

    return res.status(200).json(defaultersCustomers);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

async function customersUpToDate(req, res) {
  const { id } = req.user;

  try {
    const upToDate = await knex("customers")
      .select("name", "id", "cpf")
      .innerJoin("charges", "customers.id", "charges.customer_id")
      .whereNot("type_charge", "defeated")
      .andWhere("customer_id", id)

    return res.status(200).json(upToDate);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = {
  requestCharges,
  requestTotalAmount,
  countCharges,
  defeatedCustomers,
  customersUpToDate
}
