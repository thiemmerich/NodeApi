const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        tamanho: DataTypes.STRING,
        tipo: DataTypes.STRING,
        marca: DataTypes.STRING,
        preco: DataTypes.DOUBLE
    });

    sequelizePaginate.paginate(Product);
    return Product;
}