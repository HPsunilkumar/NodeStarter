const db = require('../models');
const { Op } = require("sequelize");

// Returns user if email is present in db, returns false otherwise
const emailExists = async (email) => {
  if(email === '' || email === undefined || email === null) {
    throw new Error('Invaild email provided');
  }
  const user = await db.user.findOne({
    where: {
      email,
      isActive: 1
    }
  });
  console.log(email);
  return user || null;
};

const findUserById = async (userId) => {
  if(!userId) {
    throw new Error('Invaild argument userId');
  }
  const user = await db.user.findOne({
    where: {
      id: userId
    }
  });
  return user || null;
};

const findUser = async ({ email, password }) => {
  const user = await db.user.findOne({
    where: {
    [Op.and]: [{ email }, { password }]
    }
  });
  console.log(user);
  return user || null;
};

const updateUserById = async (args) => {
  const { userId, ...updateValues } = args;
  if(!userId) {
    throw new Error('Invaild argument userId');
  }
  const user = await db.user.update(
    updateValues,
    {
      where: {
        id: userId
      }
    }
  );
  return user || null;
};

const createUser = async (args) => {
  const { firstName, lastName, email, password, roleId = 1 } = args;
  const permissions = await _ValidateroleIds(roleId);
  if(permissions === null) {
    throw new Error('Permission ID not found');
  }
  const user = await db.user.create({
    firstName,
    lastName,
    email,
    password,
    roleId,
    isActive: 1
  });
  return user;
};

const _ValidateroleIds = async (roleId) => {
  const permissions = await db.role.findOne({
    where: {
      id: roleId
    }
  });
  return permissions || null;
};

module.exports = {
  findUser,
  emailExists,
  createUser,
  findUserById,
  updateUserById
};
