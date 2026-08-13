const inquiryService = require('../services/inquiryService');

const create = async (req, res, next) => {
  try {
    const inquiry = await inquiryService.createInquiry(req.body);
    res.status(201).json({ message: 'Inquiry submitted successfully.', data: inquiry });
  } catch (error) {
    next(error);
  }
};

const list = async (_req, res, next) => {
  try {
    res.json({ data: await inquiryService.getInquiries() });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, list };

