const knex = require('../database/connection')


const editCharges = async (req, res) => {
    const { description, status, charge_value, due_date } = req.body
    const { id } = req.params

    try {
        const chargeExist = await knex("charges").where('id', id).first();

        if (!chargeExist) {
          return res.status(404).json({ mensagem: "Esta cobrança não existe em nossa base dados" })
        }

        const charge = {
            description,
            status,
            charge_value,
            due_date
        }

        await knex('charges').update(charge).where('id', id)

        return res.status(201).json({ mensagem: 'Cobrança atualizada com sucesso.' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = editCharges