const Sequelize = require('sequelize').Sequelize;
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const PedidoItens = sequelize.define('PedidoItens', {
        idProduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        idPedido:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        tamanho: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valorTotal: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    },{
        //Impede alterar o nome da tabela
        freezeTableName: true,
        //Nome da tabela
        tableName: 'pedido_itens'
    })
    ;
    sequelizePaginate.paginate(PedidoItens);
    return PedidoItens;
}