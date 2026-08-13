const fs = require('fs/promises');
const careerApplicationService = require('../services/careerApplicationService');

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'CV file is required.' });
    }

    const application = await careerApplicationService.createApplication({
      ...req.body,
      cv_path: req.file.path,
      cv_original_name: req.file.originalname,
    });

    return res.status(201).json({ message: 'Application submitted successfully.', data: application });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path).catch(() => undefined);
    return next(error);
  }
};

const list = async (_req, res, next) => {
  try {
    const applications = await careerApplicationService.getApplications();
    const data = applications.map((item) => ({
      id: item.id,
      applicant_name: item.name,
      email: item.email,
      phone: item.phone,
      position: item.role,
      cover_letter: item.message,
      resume_url: `/uploads/${require('path').basename(item.cv_path)}`,
      resume_path: item.cv_path,
      status: item.status,
      created_at: item.createdAt,
    }));
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const application = await careerApplicationService.updateApplication(req.params.id, req.body);
    res.status(application ? 200 : 404).json(application ? { data: application } : { message: 'Application not found.' });
  } catch (error) { next(error); }
};

module.exports = { create, list, update };
