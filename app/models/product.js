const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        codigo: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        tamanho: DataTypes.STRING,
        tipo: DataTypes.STRING,
        marca: DataTypes.STRING,
        preco: DataTypes.DOUBLE
    });

    //Product.sync({force: true});
    sequelizePaginate.paginate(Product);
    return Product;
}