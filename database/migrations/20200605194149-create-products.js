'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      tamanho: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tipo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      marca: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      preco: {
        allowNull: false,
        type: DataTypes.DOUBLE,
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

  down: (queryInterface) => {
    return queryInterface.dropTable('Products');
  }
};
