const express = require('express')
const neoRouter= require('./controllers/neoController.js')
const app =express()
app.use(express.json())

app.use('/neo', neoRouter)

module.exports = app;
