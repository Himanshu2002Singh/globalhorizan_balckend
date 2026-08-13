const { Inquiry } = require('../models');

const createInquiry = (data) => Inquiry.create(data);
const getInquiries = () => Inquiry.findAll({ order: [['createdAt', 'DESC']] });

module.exports = { createInquiry, getInquiries };

