// tests/server.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const neoController = require('../controllers/neoController');
const apodController = require('../controllers/apodController');
const marsRoverController = require('../controllers/marsRoverController');
const epicController = require('../controllers/epicController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/neo', neoController);
app.use('/apod', apodController);
app.use('/mars-rover', marsRoverController);
app.use('/epic', epicController);

describe('Server Routes', () => {
  test('GET /apod should return 200 and valid response', async () => {
    const response = await request(app).get('/apod?date=2023-10-06');
    expect(response.status).toBe(200);
    // You can further validate the response body if needed
    expect(response.body).toHaveProperty('title'); // Assuming response has title
  });

  test('GET /neo should return 200 and valid response', async () => {
    const response = await request(app).get('/neo');
    expect(response.status).toBe(200);
    // You can further validate the response body if needed
  });

  test('GET /mars-rover should return 200 and valid response', async () => {
    const response = await request(app).get('/mars-rover/photos?sol=1000');
    expect(response.status).toBe(200);
    // You can further validate the response body if needed
  });

  test('GET /epic should return 200 and valid response', async () => {
    const response = await request(app).get('/epic');
    expect(response.status).toBe(200);
    // You can further validate the response body if needed
  });

  test('Unknown route should return 404', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});
