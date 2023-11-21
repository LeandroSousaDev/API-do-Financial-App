const knex = require('./../database/connection');

async function deleteCharge(req, res) {
  const { id } = req.params

  try {

    const charge = await knex('charges').where({ id }).first();

    if (!charge) {
      return res.status(404).json({ mensagem: "Cobrança com este ID não econtrada." });
    }

    if (charge.status !== 'Pendente') {
      return res.status(400).json({ mensagem: "Apenas é possivél deletar cobranças com: status pendente com a data igual a atual e status vencidas" });
    }

    if (charge.due_date <= new Date()) {
      return res.status(400).json({ mensagem: "A data de vencimento é anterior a data atual." });
    }

    await knex('charges').where({ id }).del();

    return res.status(200).json({ mensagem: "Cobrança deletada com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = deleteCharge;