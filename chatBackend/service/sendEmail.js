var nodemailer = require("nodemailer");
var mailCredential = require("./mailCredential");
module.exports = async () => {
    var smtpTransport = nodemailer.createTransport({ mailCredential });
    var token = new Tokens({ _userId: newUser._id, token: jwt.sign({ _id: newUser._id }, configModule.key) });
    token = await token.save()
    let link = "http://" + req.get('host') + "/verify/" + token.token;
    mailOptions = {
        from: "navneet.jha@mail.vinove.com",
        to: req.body.email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
}