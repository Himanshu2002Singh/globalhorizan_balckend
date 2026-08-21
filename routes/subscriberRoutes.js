const router = require('express').Router();
const controller = require('../controllers/subscriberController');

router.route('/').post(controller.create).get(controller.list);

module.exports = router;

