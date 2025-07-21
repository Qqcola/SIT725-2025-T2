 const express = require('express');
 const path = require('path');
 const app = express();
 const PORT = process.env.PORT || 3000;

 // Middleware to parse JSON bodies (for POST requests)
 app.use(express.json());
 
 // Serve static files from the "public" folder
 app.use(express.static(path.join(__dirname, 'public')));
 
 // In-memory array to store quotes
 let quotes = [
 "The best way to predict the future is to invent it.",
 "Life is 10% what happens to us and 90% how we react to it.",
 "The only limit to our realization of tomorrow is our doubts of today.",
 "Do not wait to strike till the iron is hot; but make it hot by striking."
 ];

 // GET endpoint to retrieve a random quote
 // Usage example: http://localhost:3000/api/quote
 app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
 });
 // Optional: POST endpoint to add a new quote
 // Example POST body: { "quote": "Your new inspirational quote." 

app.get('/square', (req, res) => {
 const num = parseFloat(req.query.num);
 const square = num * num;
 res.send(`The square of ${num} is: ${square}`);
 });

 app.listen(PORT, () => {
    console.log('App is listening on port: ' + PORT)
 })