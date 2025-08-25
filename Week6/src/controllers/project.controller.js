// src/controllers/project.controller.js
const Project = require('../models/project.model');

// GET /api/projects
async function getAllProjects(req, res) {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json({ statusCode: 200, data: projects, message: 'Success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

// POST /api/projects
async function createProject(req, res) {
  try {
    const { title, image, link, description } = req.body;
    const created = await Project.create({ title, image, link, description });
    res.status(201).json({ statusCode: 201, data: created, message: 'Created' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

module.exports = { getAllProjects, createProject };
