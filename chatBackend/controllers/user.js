const bcrypt = require('bcrypt');
const { Users, validate } = require('../models/user');
const Joi = require('joi');
const Tokens = require('../models/verifyTokens');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
var sendMail = require('../service/sendEmail');
const configModule = require('../config/config');

exports.register = async (req, res) => {
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
            var token = new Tokens({ token: jwt.sign({ _id: newUser._id }, configModule.key) });
            token = await token.save()
            let link = "http://" + req.get('host') + "/verify/" + token.token;
            mailOptions = {
                from: "navneet.jha@mail.vinove.com",
                to: req.body.email,
                subject: "Please confirm your Email account",
                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
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
}

exports.verify = async (req, res) => {
    let token = await Tokens.findOne({ token: req.params.tokenId });

    if (!token) {
        return res.status(422).send({ msg: 'Token has expired' });
    }

    console.log('token:', jwt.decode(token.token)._id);

    let user = await Users.findOne({ _id: jwt.decode(token.token)._id })

    if (!user) {
        return res.status(404).send({ msg: 'No such user exist' });
    }

    user.confirmed = true;
    try {
        await user.save();
        await Tokens.deleteOne({ _id: token._id });
        return res.status(200).send({ msg: 'User verified successfully' });
    }
    catch (ex) {
        console.log('err', ex);
        return res.status(500).send({ msg: 'Exception Occured' });
    }
}

exports.resendVerify = async (req, res) => {
    if (req.body) {
        const { error } = resendValidate(req.body);

        if (error) {
            return res.status(422).send(error.details[0].message);
        }

        const user = await Users.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send({ msg: 'User does not exist' });
        }

        if(user.confirmed){
            return res.status(400).send({ msg : "User is already confirmed" });
        }

        var token = new Tokens({ token: jwt.sign({ _id: user._id }, configModule.key) });
        try{
            token = await token.save();
            let link = "http://" + req.get('host') + "/verify/" + token.token;
            mailOptions = {
                from: "navneet.jha@mail.vinove.com",
                to: req.body.email,
                subject: "Please confirm your Email account",
                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
            sendMail(mailOptions);
            return res.status(200).send({ msg : 'Verification Mail Sent' });
        }
        catch(ex){
            console.log(ex);
            return res.status(500).send({ msg : 'Exception Occured' });
        }


    }
}

exports.forgotPassword = async (req, res) => {
    if(req.body){

        const { error } = resendValidate(req.body);

        if(error){
            return res.status(422).send(error.details[0].message);
        }

        const user = await Users.findOne({ email : req.body.email });

        if(!user){
            return res.status(404).send({ msg : "User does not exist" });
        }

        var token = new Tokens({ token: jwt.sign({ _id: user._id }, configModule.key) });
        try{
            token = await token.save();
            let link = "http://" + req.get('host') + "/resetPassword/" + token.token;
            mailOptions = {
                from: "navneet.jha@mail.vinove.com",
                to: req.body.email,
                subject: "Password Reset Mail",
                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
            sendMail(mailOptions);
            return res.status(200).send({ msg : 'Password reset mail sent' });
        }
        catch(ex){
            console.log(ex);
            return res.status(500).send({ msg : 'Exception Occured' });
        }
        
    }
}

function resendValidate(reqBody) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required()
    })

    return Joi.validate(reqBody, schema);
}