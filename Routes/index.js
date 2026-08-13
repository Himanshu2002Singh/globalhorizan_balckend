const router = require('express').Router();

router.use('/inquiries', require('./inquiryRoutes'));
router.use('/subscribers', require('./subscriberRoutes'));
router.use('/career-applications', require('./careerApplicationRoutes'));
router.use('/blogs', require('./blogRoutes'));
router.use('/job-posts', require('./jobPostRoutes'));

module.exports = router;
