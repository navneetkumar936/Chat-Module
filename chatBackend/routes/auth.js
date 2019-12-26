const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { Users } = require('../models/user');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');


router.post('/', async function(req, res){
    if(req.body){
        const { error } = validate(req.body);
        
        if(error){
            return res.status(422).send(error.detail[0].message);
        }

        const user = await Users.findOne({ email : req.body.email });

        if(!user){
            return res.status(422).send('Incorrect Email or Password');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword){
            return res.status(400).send('Incorrect Email or Password');
        }

        const token = jwt.sign({_id: user._id}, config);

        return res.status(200).send({ token })
        
    }
    else{
        return res.status(422).send('Enter all data');
    }
})


function validate(reqBody){
    const schema = Joi.object().keys({
        email : Joi.string().email(),
        password : Joi.string()
    })

    return Joi.validate(reqBody, schema);
}

module.exports = router;