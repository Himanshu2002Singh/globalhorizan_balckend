const service = require('../services/jobPostService');

const create = async (req, res, next) => {
  try { res.status(201).json({ data: await service.create(req.body) }); } catch (error) { next(error); }
};
const list = async (_req, res, next) => {
  try { res.json({ data: await service.list() }); } catch (error) { next(error); }
};
const update = async (req, res, next) => {
  try {
    const record = await service.update(req.params.id, req.body);
    res.status(record ? 200 : 404).json(record ? { data: record } : { message: 'Job post not found.' });
  } catch (error) { next(error); }
};
const remove = async (req, res, next) => {
  try {
    const deleted = await service.remove(req.params.id);
    res.status(deleted ? 204 : 404).send();
  } catch (error) { next(error); }
};

module.exports = { create, list, update, remove };

