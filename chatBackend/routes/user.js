const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users, validate } = require('../models/user');
const { config } = require('../config/config');

router.post('/register', async function(req, res){
    if(req.body){
        const { error } = validate(req.body);

        if(error){
            return res.status(422).send(error.details[0].message);
        }

        let user = await Users.findOne({ email : req.body.email });
        if(user){
            console.log(user);
            
            return res.status(400).send('User already exists');
        }

        user = new Users({
            email : req.body.email,
            password : req.body.password,
            contact : req.body.contact
        })

        const salt = await bcrypt.genSalt(config);
        user.password = await bcrypt.hash(user.password, salt);
        
        try {
            await user.save();
            return res.status(200).send(user);
        }
        catch(ex){
            return res.status(500).send('Exception Occured');
        }
    }
    else{
        return res.status(422).send('Enter all data');
    }
})

module.exports = router;