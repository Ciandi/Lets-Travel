// index.js

const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000; // Set your desired port
const usersHandler = require('./handlers/users')

// Middleware
app.use(morgan('tiny')); // Logging middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Endpoints
app.get("/getUsers", usersHandler.getUsers);
app.post('/loginUser', usersHandler.loginUser);
app.post('/addUser', usersHandler.addUser); // Add this line for the registration endpoint

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
