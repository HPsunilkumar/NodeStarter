'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      isAlphanumeric: true,
      required: true,
      allowNull: true,
      len: [1, 20]
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true,
      len: [1, 20]
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true,
      len: [7, 100],
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true,
      len: [8, 20]
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: true,
      len: [10, 12]
    },
    userSurrogateId: {
      type: DataTypes.STRING,
      required: false,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      required: true,
      allowNull: false
    },
    roleId: {
      // FK from permissions table
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false
    },
    userInfoId: {
      // FK from permissions table
      type: DataTypes.UUID,
      required: false,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    // freezeTableName: true,
    timestamps: true,
    paranoid: true
  });
};