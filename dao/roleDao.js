const db = require('../models');

const createRole = async (args) => {
  const newRole = await db.role.create({
    ...args
  });
  return newRole;
};
createRole.keys = {
  type: 'type'
};

module.exports = {
  createRole
};