const { Blog } = require("../Models");

const create = (data) => Blog.create(data);
const list = () => Blog.findAll({ order: [["created_at", "DESC"]] });
const getById = (id) => Blog.findByPk(id);
const getByIdentifier = async (identifier) => {
  if (!identifier) return null;
  // numeric id?
  if (/^\d+$/.test(String(identifier))) {
    const item = await Blog.findByPk(Number(identifier));
    if (item) return item;
  }
  // otherwise try slug lookup
  return Blog.findOne({ where: { slug: identifier } });
};
const remove = (id) => Blog.destroy({ where: { id } });

module.exports = { create, list, getById, getByIdentifier, remove };
