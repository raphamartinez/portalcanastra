const Repositorie = require('../repositories/quotation')
const RepositorieVoucher = require('../repositories/voucher')
const { InvalidArgumentError, InternalServerError, NotFound } = require('./error')

class Quotation {

    async insert(file, quotation, id_login) {
        try {
            let ids = []

            for (let index = 0; index < quotation.items.length; index++) {
                const item = quotation.items[index];
                const price = quotation.prices[index];

                const id_quotation = await Repositorie.insert(quotation, item, price)
                ids.push(id_quotation)
            }

            for (const id of ids) {
                await RepositorieVoucher.insert(file, id, id_login)
            }

            return true
        } catch (error) {
            console.log(error);
            throw new InternalServerError('Error.')
        }
    }

    list() {
        try {
            return Repositorie.list()
        } catch (error) {
            throw new InternalServerError('Error.')
        }
    }

    update(data, id) {
        try {
            return Repositorie.update(data, id)
        } catch (error) {
            throw new InternalServerError('Error.')
        }
    }

    delete(id) {
        try {
            return Repositorie.delete(id)

        } catch (error) {
            throw new InternalServerError('Error.')
        }
    }
}

module.exports = new Quotation