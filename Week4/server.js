// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Schema & Model
const projectSchema = new mongoose.Schema({
  title:       String,
  image:       String,
  link:        String,
  description: String
});
const Project = mongoose.model('Project', projectSchema);

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: 'Success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

// POST a new project
app.post('/api/projects', async (req, res) => {
  try {
    const proj = new Project({
      title:       req.body.title,
      image:       req.body.image,
      link:        req.body.link,
      description: req.body.description
    });
    const saved = await proj.save();
    res.status(201).json({ statusCode: 201, data: saved, message: 'Created' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
