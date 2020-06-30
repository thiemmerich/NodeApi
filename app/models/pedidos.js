const Sequelize = require('sequelize').Sequelize;
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Pedidos = sequelize.define('Pedidos', {
        idPedido: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idUsuario:{
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
        tableName: 'pedidos'
    })
    ;
    sequelizePaginate.paginate(Pedidos);
    return Pedidos;
}