'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    // underscored: true,
    paranoid: true
  });
};