const express = require('express');
const morgan = require('morgan');
const usersHandler = require('./handlers/users');

const app = express();
const PORT = process.env.PORT || 5000; // Set your desired port

// Middleware
app.use(morgan('tiny')); // Logging middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Endpoints
app.get('/getUsers', usersHandler.getUsers);
app.post('/loginUser', usersHandler.loginUser);
app.post('/addUser', usersHandler.addUser);
app.post('/changePassword', usersHandler.changePassword); 
app.post('/deleteUser', usersHandler.deleteUser);

// Favorite Endpoints
app.post('/addFavorite', usersHandler.addFavorite);
app.post('/deleteFavorite', usersHandler.deleteFavorite); 
app.get('/getFavorites/:username', usersHandler.getFavorites);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
