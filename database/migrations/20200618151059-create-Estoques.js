'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Estoques', {
      idProduto: {
        type: DataTypes.INTEGER,
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
    return queryInterface.dropTable('Estoques');
  }
};
