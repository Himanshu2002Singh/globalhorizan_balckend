const path = require('path');
const multer = require('multer');
const router = require('express').Router();
const controller = require('../controllers/careerApplicationController');

const allowedExtensions = new Set(['.pdf', '.doc', '.docx']);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const isAllowed = allowedExtensions.has(path.extname(file.originalname).toLowerCase());
    callback(isAllowed ? null : new Error('Only PDF, DOC, and DOCX files are allowed.'), isAllowed);
  },
});

router.route('/').post(upload.single('cv'), controller.create).get(controller.list);
router.patch('/:id', controller.update);

module.exports = router;
