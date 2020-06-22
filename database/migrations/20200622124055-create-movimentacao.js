'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Movimentacao', {
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
  });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Movimentacao');
  }
};
