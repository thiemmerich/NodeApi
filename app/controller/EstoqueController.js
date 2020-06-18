const { Estoque } = require('../models');
const { Product } = require('../models');
const { Sequelize } = require('sequelize')

module.exports = {
    async index(req, res) {
        
        const options = {
            page: 2,
            paginate: 10,
            include: [{
                model: Product,
                required: false,
                association: Estoque.belongsTo(Product),
                //on: Sequelize.col('product.id')
            }],
        }
        const productsEstoque = await Estoque.paginate(options);

        return res.json(productsEstoque);
    },

    async store(req, res) {
        const productsEstoque = await Estoque.create(req.body)
            .catch((err) => {
                return res.status(400).json({ errorMsg: 'Erro ao gravar na base de dados: ' + err });
            });

        return res.json(product);
    }
}