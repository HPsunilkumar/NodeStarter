'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('otp', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      isAlphanumeric: true,
      required: true
    },
    target: {
      type: DataTypes.STRING,
      isAlphanumeric: true,
      required: true
    },
    type: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: true,
      len: [1]
    },
    status: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: true,
      len: [1]
    },
    userId: {
      // FK from permissions table
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },
    expiryDate: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });
};