const { Pedidos } = require('../models');
const { PedidoItens } = require('../models');

const db = require('../models/index');

module.exports = {

    async show(req, res) {
        const pedido = await Pedidos.findByPk(req.params.id);

        return res.json(pedido);
    },

    async gravarNovoPedido(req, res) {

        const pedido = req.body.pedido;
        const itens = req.body.itens;
        //console.log("ITENS:");
        //console.log(itens);
        //console.log("BODY:");
        //console.log(req.body);

        const transacao = await db.sequelize.transaction();

        await Pedidos.create(pedido, { transaction: transacao })
            .then(async (pedido) => {

                itens.forEach(element => {

                    element.idPedido = pedido.idPedido;
                });

                PedidoItens.bulkCreate(itens, { transaction: transacao })
                    .then(async (item) => {
                        console.log('OK: ' + item);
                        await transacao.commit();
                    })
                    .catch(async (err) => {
                        await transacao.rollback();

                        return res.status(400).json({
                            errorMsg: 'ERRO: Insercao de itens do pedido! -> ' + err
                        });
                    });

                return res.json([pedido, itens]);
            })
            .catch(async (err) => {
                await transacao.rollback();

                return res.status(400).json({
                    errorMsg: 'ERRO: Insercao de pedido! -> ' + err
                });
            });
    },
};