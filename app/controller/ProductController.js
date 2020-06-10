const { Product } = require('../models');

module.exports = {
    async index(req, res) {
        const options = {
            page: 2,
            paginate: 10
        }
        const products = await Product.paginate(options);

        return res.json(products);
    },

    async store(req, res) {
        const product = await Product.create(req.body)
        .catch((err) => {
            return res.status(400).json({ errorMsg: 'Erro ao gravar na base de dados: ' + err});
        });

        return res.json(product);
    }    
}