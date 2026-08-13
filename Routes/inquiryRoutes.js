const router = require('express').Router();
const controller = require('../controllers/inquiryController');

router.route('/').post(controller.create).get(controller.list);

module.exports = router;

