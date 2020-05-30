const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const auth = require('./routes/auth');
const user = require('./routes/user');
const chat = require('./routes/chat');
var cors = require('cors');

mongoose.connect('mongodb://localhost/chat_app', { useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => { console.log('connected to chat_app');})
    .catch(() => { console.log('error while connecting to db');})

app.use(cors())

app.use(express.json());

const port = (process.env.port || 3000);

app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/chat', chat);

app.listen(port, function(){
    console.log(`Server started at ${port}...`);
})