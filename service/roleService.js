const roleDAO = require('../dao/roleDao');

const createRole = async (args) => {
  console.log(args);
  return await roleDAO.createRole(args);
};

module.exports = {
  createRole
};