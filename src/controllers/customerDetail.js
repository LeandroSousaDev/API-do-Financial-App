const knex = require('../database/connection')

const customerDetail = async (req, res) => {
    const { id } = req.params

    try {
        const customer = await knex("customers").where('id', id).first();

        if (!customer) {
          return res.status(404).json({ mensagem: "Este ID não corresponde a nenhum cliente na base de dados." })
        }

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
            .innerJoin('customers', 'charges.id_customer', 'customers.id')
            .where('id_customer', id);





        const charges = allCharges.map(charge => {
            return {
                id: charge.id_charge,
                description: charge.description,
                date: charge.due_date,
                charge_value: charge.charge_value,
                status: charge.status,
            }
        })

        const detail = {
            name: customer.customer_name,
            email: customer.email,
            cpf: customer.cpf,
            phone: customer.phone,
            cep: customer.cep,
            street: customer.street,
            neighborhood: customer.neighborhood,
            complement: customer.complement,
            city: customer.city,
            country_state: customer.country_state,
            charges
        }

        return res.status(200).json(detail);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = customerDetail
