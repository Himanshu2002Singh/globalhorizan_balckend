const { CareerApplication } = require("../Models");

const createApplication = (data) => CareerApplication.create(data);
const getApplications = () =>
  CareerApplication.findAll({ order: [["createdAt", "DESC"]] });
const updateApplication = async (id, data) => {
  const application = await CareerApplication.findByPk(id);
  return application ? application.update(data) : null;
};

module.exports = { createApplication, getApplications, updateApplication };
