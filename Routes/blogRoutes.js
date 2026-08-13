const router = require('express').Router();
const controller = require('../controllers/blogController');

router.route('/').get(controller.list).post(controller.create);
router.route('/:identifier').get(controller.show).delete(controller.remove);

module.exports = router;

