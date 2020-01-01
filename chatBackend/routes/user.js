const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users, validate } = require('../models/user');
var _ = require('lodash');

router.post('/register', async function(req, res){
    if(req.body){
        const { error } = validate(req.body);

        if(error){
            return res.status(422).send(error.details[0].message);
        }

        let user = await Users.findOne({ email : req.body.email });
        if(user){
            return res.status(400).send({msg : 'User already exists'});
        }

        user = new Users({
            email : req.body.email,
            password : req.body.password,
            contact : req.body.contact
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        try {
            await user.save();
            return res.status(200).send({user:(_.pick(user, ['email', 'contact'])), msg: 'Verification Mail Sent'});
        }
        catch(ex){
            return res.status(500).send({msg : 'Exception Occured'});
        }
    }
    else{
        return res.status(422).send({msg : 'Enter all data'});
    }
})

module.exports = router;