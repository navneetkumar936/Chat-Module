const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const auth = require('./routes/auth');
const user = require('./routes/user');

mongoose.connect('mongodb://localhost/chat_app', { useNewUrlParser : true, useUnifiedTopology: true })
    .then(() => { console.log('connected to chat_app');})
    .catch(() => { console.log('error while connecting to db');})

app.use(express.json());

const port = (process.env.port || 3000);

app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);

app.listen(port, function(){
    console.log(`Server started at ${port}...`);
})