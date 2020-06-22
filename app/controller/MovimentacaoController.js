const { Estoque } = require('../models');
const { Movimentacao } = require('../models');
const { Product } = require('../models');
const { User } = require('../models');
const { Sequelize } = require('sequelize')

module.exports = {
    async relatorio(req, res) {
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
            },
            {
                model: User,
                attributes: ['name'],
                required: true,
                association: Movimentacao.belongsTo(User, { foreignKey: 'usuario' }),
                //on: Sequelize.col('products.id')
            },
            ],
        }
        const relatorioMovimentacao = await Movimentacao.paginate(options)
            .then((relatorio) => { return res.json(relatorio) })
            .catch((err) => {
                console.log("ERRO_relatorioMovimentacao: " + err);
                return res.status(400).json({
                    
                    errorMsg: 'Requisicao invalida: ' + msgError
                });
            }
            );
    },

    async novaMovimentacao(req, res) {

        let movimentacao = req.params.movimentacao;
        var quantidadeAnterior = 0;
        await Estoque.findAll({
            attributes: ['quantidade'],
            where: {
                idProduto: movimentacao.idProduto,
            }
        }).then((posicaoEstoque) => {
            quantidadeAnterior = posicaoEstoque.quantidade;
        }).catch((err) => {
            console.log('ERRO_novaMovimentacao: busca quantidade anterior: ' + err)
            return res.status(500).json({ errorMsg: 'Erro ao buscar dados do estoque! ' });
        });

        const movimento = {
            idProduto: movimentacao.idProduto,
            tamanho: movimentacao.tamanho,
            quantidade: movimentacao.quantidade,
            quantidadeAnterior: quantidadeAnterior,
            valor: movimentacao.valor,
            dataHora: Sequelize.fn('NOW'),
            tipo: movimentacao.tipo,
            devolucao: movimentacao.devolucao,
            usuario: movimentacao.usuario,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW'),
        }
        const mov = await Movimentacao.create(movimento)
            .catch((err) => {
                console.log("ERRO_novaMovimentacao: Nao foi possivel gravar na base" + + err);
                console.log(movimento);
                return res.status(500).json({ errorMsg: 'Erro ao gravar na base de dados: ' });
            });

        return res.json(mov);
    }
}