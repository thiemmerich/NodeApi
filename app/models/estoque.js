const Sequelize = require('sequelize').Sequelize;
const sequelizePaginate = require('sequelize-paginate');
const { Product } = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Estoque = sequelize.define('Estoque', {
        idProduto:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        tamanho: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
    ;
    //Estoque.sync({force: true});
    sequelizePaginate.paginate(Estoque);
    return Estoque;
}