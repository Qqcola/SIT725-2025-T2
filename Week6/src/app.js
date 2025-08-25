// src/app.js
const path = require('path');
const express = require('express');
const projectRoutes = require('./routes/project.routes');
require('./config/db'); // initialize Mongo connection

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static assets
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api/projects', projectRoutes);

module.exports = app;
