const Sequelize = require('sequelize').Sequelize;
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Movimentacao = sequelize.define('Movimentacao', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idProduto:{
            type: DataTypes.STRING,
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
        quantidadeAnterior: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valor: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        dataHora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,  
        },
        devolucao: {
            type: DataTypes.BOOLEAN,
        },
        usuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        //Impede alterar o nome da tabela
        freezeTableName: true,
        //Nome da tabela
        tableName: 'movimentacao'
    })
    ;
    //Movimentacao.sync({force: true});
    sequelizePaginate.paginate(Movimentacao);
    return Movimentacao;
}