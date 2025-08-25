// server.js
// Entry point of the application

const app = require('./src/app');

// Simple GET endpoint for adding two numbers
// Usage: /add?a=10&b=5
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);  // extract and convert 'a' from query string
  const b = parseFloat(req.query.b);  // extract and convert 'b' from query string

  // Validate that both inputs are numbers
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Invalid input");
  }

  // Perform addition
  const sum = a + b;

  // Respond with the result
  res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

// Start the server on configured port (default: 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});