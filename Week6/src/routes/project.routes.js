// src/routes/project.routes.js
const router = require('express').Router();
const { getAllProjects, createProject } = require('../controllers/project.controller');

router.get('/', getAllProjects);
router.post('/', createProject);

module.exports = router;
