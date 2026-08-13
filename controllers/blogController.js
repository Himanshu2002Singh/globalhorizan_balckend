const service = require('../services/blogService');

const create = async (req, res, next) => {
  try { res.status(201).json({ data: await service.create(req.body) }); } catch (error) { next(error); }
};
const list = async (_req, res, next) => {
  try { res.json({ data: await service.list() }); } catch (error) { next(error); }
};
const show = async (req, res, next) => {
  try {
    const identifier = req.params.identifier || req.params.id;
    const item = await service.getByIdentifier(identifier);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ data: item });
  } catch (error) { next(error); }
};
const remove = async (req, res, next) => {
  try {
    const deleted = await service.remove(req.params.id);
    res.status(deleted ? 204 : 404).send();
  } catch (error) { next(error); }
};

module.exports = { create, list, show, remove };

