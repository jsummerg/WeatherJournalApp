// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Dependencies */
const bodyParser = require('body-parser')


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Routes

app.get('/', function (req, res) { // TO-DO Verify
    return projectData
})


app.post('/', pData);

function pData(req,res){
  newEntry = {
    temperature: req.body.temperature, // TO-DO update data names
    date: req.body.date,
    userResponse: req.body.user-response
  }

  projectData.push(newEntry)
  console.log(projectData)
}

// Setup Server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})