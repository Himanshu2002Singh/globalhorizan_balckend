const { JobPost } = require('../models');

const create = (data) => JobPost.create(data);
const list = () => JobPost.findAll({ order: [['created_at', 'DESC']] });
const update = async (id, data) => {
  const record = await JobPost.findByPk(id);
  return record ? record.update(data) : null;
};
const remove = (id) => JobPost.destroy({ where: { id } });

module.exports = { create, list, update, remove };

