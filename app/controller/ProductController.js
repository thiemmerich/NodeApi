const { Product } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {

        let recordsPerPage = parseInt(req.params.recordsPerPage);
        let pageToLoad = parseInt(req.params.page);
        let msgError = (isNaN(recordsPerPage) ? 'Registros por pagina=' + recordsPerPage : '')
            + (isNaN(pageToLoad) ? 'Pagina=' + pageToLoad : '');

        const options = {
            paginate: recordsPerPage,
            page: pageToLoad
        }
        const products = await Product.paginate(options)
            .then(products => {
                return res.json(products);
            })
            .catch((err) => {
                return res.status(400).json({
                    errorMsg: 'Requisicao invalida: ' + msgError
                });
            });
    },

    async store(req, res) {
        const product = await Product.upsert(req.body)
            .catch((err) => {
                return res.status(400).json({ errorMsg: 'Erro ao gravar na base de dados: ' + err });
            });

        return res.status(200).json(product.dataValues);
    },

    async searchLike(req, res) {
        await Product.findAll({
            where: {
                nome: {
                    [Op.like]: '%' + req.params.nome + '%'
                }
            }
        })
            .then((products) => {
                return res.json(products);
            })

            .catch((err) => {
                return res.status(400).json({ errorMsg: 'Erro ao gravar na base de dados: ' + err });
            });
    },

    async searchByCode(req, res) {
        await Product.findAll({
            where: {
                codigo: req.params.codigo
            }
        })
            .then((products) => {
                return res.json(products);
            })

            .catch((err) => {
                return res.status(400).json({ errorMsg: 'Erro ao gravar na base de dados: ' + err });
            });
    }
}