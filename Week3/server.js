// Simple Express server to serve static content
var express = require("express");
var app = express();
var port = process.env.port || 3000;

// Serve everything in the public folder as static assets
app.use(express.static(__dirname + '/public'));

// Parse JSON and URL-encoded bodies (if needed)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Start listening
app.listen(port, () => {
  console.log("App listening to: " + port);
});
