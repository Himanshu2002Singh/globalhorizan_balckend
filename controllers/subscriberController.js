const subscriberService = require('../services/subscriberService');

const create = async (req, res, next) => {
  try {
    const subscriber = await subscriberService.createSubscriber(req.body);
    res.status(201).json({ message: 'Subscribed successfully.', data: subscriber });
  } catch (error) {
    next(error);
  }
};

const list = async (_req, res, next) => {
  try {
    res.json({ data: await subscriberService.getSubscribers() });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, list };

