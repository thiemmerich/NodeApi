const { Estoque } = require('../models');
const { Product } = require('../models');
const { Sequelize } = require('sequelize')

module.exports = {
    async index(req, res) {

        let recordsPerPage = parseInt(req.params.recordsPerPage);
        let pageToLoad = parseInt(req.params.page);
        let msgError = (isNaN(recordsPerPage) ? 'Registros por pagina=' + recordsPerPage : '')
            + (isNaN(pageToLoad) ? 'Pagina=' + pageToLoad : '');
        const options = {
            paginate: recordsPerPage,
            page: pageToLoad,
            include: [{
                model: Product,
                attributes: ['nome', 'marca'],
                required: true,
                association: Estoque.belongsTo(Product, { foreignKey: 'idProduto' }),
                //on: Sequelize.col('products.id')
            }],
        }
        const productsEstoque = await Estoque.paginate(options)
            .then((productsEstoque) => { return res.json(productsEstoque) })
            .catch((err) => {
                return res.status(400).json({
                    errorMsg: 'Requisicao invalida: ' + msgError
                });
            }
            );

    },

    async store(req, res) {
        const productsEstoque = await Estoque.create(req.body)
            .then((product) => {
                return res.json(product);
            })
            .catch((err) => {
                return res.status(400).json({ errorMsg: 'Erro ao gravar na base de dados: ' + err });
            });
    },

    async getQuantidadeEstoque(req, res) {
        await Estoque.findByPk(req.params.id)
        .then(() => {

        })
        .catch(() => {
            
        });
    }
}