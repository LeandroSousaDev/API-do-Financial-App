const knex = require('../database/connection')

const chargesDetail = async (req, res) => {
    const { id } = req.params

    try {
        const chargeExist = await knex("charges").where('id', id).first();

        if (!chargeExist) {
          return res.status(404).json({ mensagem: "Esta cobrança não existe em nossa base dados" })
        }
      
        const charge = await knex('charges')
            .select(
                'charges.id',
                'customers.customer_name',
                'charges.charge_value',
                'charges.description',
                'charges.due_date',
                knex.raw(
                    "CASE WHEN charges.status = 'Pendente' AND charges.due_date < CURRENT_DATE THEN 'Vencida' ELSE charges.status END AS status"
                )
            )
            .join('customers', 'charges.id_customer', 'customers.id')
            .where('charges.id', id)

        return res.status(200).json(charge);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = chargesDetail 