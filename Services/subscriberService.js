const { Subscriber } = require("../Models");

const createSubscriber = (data) => Subscriber.create(data);
const getSubscribers = () =>
  Subscriber.findAll({ order: [["createdAt", "DESC"]] });

module.exports = { createSubscriber, getSubscribers };
