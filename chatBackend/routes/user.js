const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users, validate } = require('../models/user');
const Tokens = require('../models/verifyTokens');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
var sendMail = require('../service/sendEmail');
const configModule = require('../config/config');

router.post('/register', async function (req, res) {
    if (req.body) {
        const { error } = validate(req.body);

        if (error) {
            return res.status(422).send(error.details[0].message);
        }

        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ msg: 'User already exists' });
        }

        user = new Users({
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        try {
            const newUser = await user.save();
            var token = new Tokens({ _userId : newUser._id, token:jwt.sign({ _id : newUser._id }, configModule.key) });
            token = await token.save()
            let link = "http://" + req.get('host') + "/verify/" + token.token;
            mailOptions = {
                from:"navneet.jha@mail.vinove.com",
                to: req.body.email,
                subject: "Please confirm your Email account",
                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
            console.log(mailOptions);
            sendMail(mailOptions)
            return res.status(200).send({ user: (_.pick(user, ['email', 'contact'])), msg: 'Verification Mail Sent' });
        }
        catch (ex) {
            console.log(ex);
            
                return res.status(500).send({ msg: 'Exception Occured' });
            }
        }
    else {
            return res.status(422).send({ msg: 'Enter all data' });
        }
    })

router.get('/verify/:tokenId', async function (req,res) {
    console.log('called',req.params.tokenId);
    let token = await Users.findOne({ email: req.body.email });
    
    return res.send({})
})

module.exports = router;