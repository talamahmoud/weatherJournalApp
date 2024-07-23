const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
app.use(express.static('website'));

app.get('/all', (req,res) =>{
    res.json(projectData);
})

app.post('/add', (req,res) => {
    const {temperature, date, userResponse} = req.body;
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;
    res.send(projectData);
})

// Setup Server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



