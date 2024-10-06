const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const neoController = require('./controllers/neoController');
const apodController = require('./controllers/apodController'); // Import APOD controller
const marsRoverController = require('./controllers/marsRoverController')
const epicController = require('./controllers/epicController'); 
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Routes
app.use('/neo', neoController);
app.use('/apod', apodController); // Add APOD route
app.use('/mars-rover', marsRoverController);
app.use('/epic', epicController); // Add EPIC route
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
