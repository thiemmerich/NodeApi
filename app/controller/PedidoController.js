const { Pedidos } = require('../models');
const { PedidoItens } = require('../models');

module.exports = {

    async show(req, res) {
        const pedido = await Pedidos.findByPk(req.params.id);

        return res.json(pedido);
    },

    async gravarNovoPedido(idUsuario, valorTotal) {
        const pedido = {
            idUsuario: idUsuario,
            valorTotal: valorTotal
        }

        await Pedidos.create(pedido).then((pedido) => {
            const itens = {
                idProduto: 1,
                idPedido: pedido.idPedido,
                tamanho: 'M',
                quantidade: 2,
                valorTotal: 50.00
            }

            PedidoItens.create(itens).then((itens) => {
                return itens;
            }).catch(() => {
                return pedido;
            });
        });
    },
};