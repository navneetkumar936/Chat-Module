const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const userSchema =  new mongoose.Schema({
    email : {
        required : true,
        type : String,
        validate : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password : {
        required : true,
        type : String
    },
    contact : {
        required : true,
        type : String
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id : this._id }, config);
    return token;
}

const Users = mongoose.model('User', userSchema);

function checkValidation(reqBody){
    const schema = Joi.object().keys({
        email : Joi.string().email(),
        password : Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        contact : Joi.string().required().min(10)
    })

    return Joi.validate(reqBody, schema);
}

module.exports = {
    Users : Users,
    validate : checkValidation
}