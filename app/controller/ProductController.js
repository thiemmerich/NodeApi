const { Product } = require('../models');

module.exports = {
    async index(req, res) {
        const products = await Product.findAll({ limit: 10 });

        return res.json(products);
    },

    async store(req, res) {
        const product = await Product.create(req.body);

        return res.json(product);
    }    
}