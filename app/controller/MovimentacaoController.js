const { Estoque } = require('../models');
const { Movimentacao } = require('../models');
const { Product } = require('../models');
const { User } = require('../models');
const { Sequelize } = require('sequelize')

const db = require('../models/index');

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

        let movimentacao = req.body;
        var quantidadeAnterior = 0;
        var posicaoEstoque = null;
        await Estoque.findAll({
            attributes: ['idProduto', 'tamanho', 'quantidade'],
            where: {
                idProduto: movimentacao.idProduto,
                tamanho: movimentacao.tamanho
            }
        }).then((value) => {
            posicaoEstoque = value[0];
            quantidadeAnterior = posicaoEstoque.quantidade;
            return insereMovimentacaoNoDB(movimentacao, posicaoEstoque, quantidadeAnterior, res);
        }).catch((err) => {
            quantidadeAnterior = 0;
            console.log('ERRO_novaMovimentacao: busca quantidade anterior: ' + err);
            return insereMovimentacaoNoDB(movimentacao, posicaoEstoque, quantidadeAnterior, res);
        });
    }

}

async function insereMovimentacaoNoDB(movimentacao, posicaoEstoque, quantidadeAnterior, res) {
    if (movimentacao.tipo.toLowerCase() === 'saida' && quantidadeAnterior < parseInt(movimentacao.quantidade)) {
        return res.status(400).json({ errorMsg: 'ERRO: Tentando realizar saida de produto sem quantidade em estoque! ' });
    }
    console.log(movimentacao);
    const movimento = geraObjetoMovimentacao(movimentacao, quantidadeAnterior);
    const transacao = await db.sequelize.transaction();
    var qtdeSomarNoEstoque = (movimentacao.tipo.toLowerCase() === 'entrada') ? movimentacao.quantidade : -movimentacao.quantidade;
    var alteraMovimentacao = () => Movimentacao.create(movimento, { transaction: transacao })
    var alteraEstoque;
    if (posicaoEstoque == null) {
        posicaoEstoque = {
            idProduto: movimentacao.idProduto,
            tamanho: movimentacao.tamanho,
            quantidade: qtdeSomarNoEstoque,
        };
        alteraEstoque = () => {
            console.log("Creating Estoque...");
            return Estoque.create(posicaoEstoque, { transaction: transacao });
        };
    } else {
        posicaoEstoque.quantidade = posicaoEstoque.quantidade + qtdeSomarNoEstoque;
        alteraEstoque = () => {
            console.log("Updating Estoque...");
            //console.log(posicaoEstoque);
            return Estoque.update(posicaoEstoque.dataValues,
                {
                    where: {
                        idProduto: movimentacao.idProduto,
                        tamanho: movimentacao.tamanho,
                    },
                    transaction: transacao
                }
            );
        }
    }
    const promises = Promise.all(
        [alteraMovimentacao(), alteraEstoque()]
    );
    promises.then(async () => {
        await transacao.commit();
        return res.json('OK!');
    }).catch(async (err) => {
        console.log("ERRO_novaMovimentacao: Nao foi possivel gravar na base: " + err);
        console.log(movimento);
        await transacao.rollback();
        return res.status(500).json({ errorMsg: 'ERRO: falha na gravação do movimento!' });
    })
}

function geraObjetoMovimentacao(movimentacao, quantidadeAnterior) {
    return {
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
}