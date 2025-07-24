// Import Express framework
const express = require('express');

// Import path module for handling file paths
const path = require('path');

// Create Express app instance
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// Parse JSON
app.use(express.json());                     

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Adds the three number inputs (GET)
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const num3 = parseFloat(req.query.num3);

  if ([num1, num2, num3].some(n => isNaN(n))) {
    return res
      .status(400)
      .json({ error: 'First, second and third inputs must be valid numbers.' });
  }

  const result = num1 + num2 + num3;
  res.json({ result });
});

// Subtracts the three number inputs (POST)
app.post('/subtract', (req, res) => {
  const { num1, num2, num3 } = req.body;

  if ([num1, num2, num3].some(n => typeof n !== 'number')) {
    return res
      .status(400)
      .json({ error: 'Inputs must be numbers.' });
  }

  const result = num1 - num2 - num3;
  res.json({ result });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
