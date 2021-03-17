// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');
require('dotenv').config()

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const PORT = 8000;
const listener = (port) => {
  console.log(`listening on localhost:${port}`);
}

// Callback to debug
app.listen(PORT, listener(PORT));

// Initialize all route with a callback function
const getWeatherData = (req, res) => {
  res.send(projectData);
}

const addWeatherData = (req, res) => {
  projectData["temperature"] = req.body.temperature;
  projectData["date"] = req.body.date;
  projectData["content"] = req.body.content;

  res.send({
    status: 200,
    message: "Entry added successfully"
  });

  console.log(projectData);
}

// Callback function to complete GET '/all'
app.get('/all', getWeatherData);

// Post Route
app.post('/add', addWeatherData);

