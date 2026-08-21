const router = require('express').Router();
const controller = require('../controllers/jobPostController');

router.route('/').get(controller.list).post(controller.create);
router.route('/:id').patch(controller.update).delete(controller.remove);

module.exports = router;

