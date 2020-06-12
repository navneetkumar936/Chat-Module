const { Users } = require('../models/user');
const { ChatRooms } = require('../models/chatRoom');
const { Messages } = require('../models/messages');
const Joi = require('joi');
var _ = require('lodash');

exports.search = async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(422).send({ msg: 'Name is required' });
    }

    const usersRecord = await Users.find({ name: { $regex: name, $options: 'i' }, confirmed: true });

    return res.status(200).send({ data: (_.map(usersRecord, o => _.pick(o, ['name', 'email', 'contact', '_id']))) });
}

exports.newMessage = async (req, res) => {
    if (req.body) {

        const { error } = checkNewMsg(req.body);

        if (error) {
            return res.status(422).send({ msg: error.details[0].message })
        }

        try {
            let receiverUser = await Users.findById(req.body.receiver);
            let convRoom = {};
            const loggedInUserChats = await ChatRooms.find({ $or: [{ user1: req.user._id }, { user2: req.user._id }] });

            if (loggedInUserChats.length) {
                loggedInUserChats.forEach((ele) => {
                    if ((ele.user1 == req.body.receiver) || (ele.user2 == req.body.receiver)) {
                        convRoom = ele;
                    }
                })
            }

            if (Object.keys(convRoom).length === 0 && convRoom.constructor === Object) {
                convRoom = new ChatRooms({ user1: req.user._id, user2: receiverUser });
                convRoom = await convRoom.save();
                let msg = {
                    chatRoomId: convRoom._id,
                    messages: [
                        {
                            sender: req.user._id,
                            msg: req.body.msg
                        }
                    ]
                }
                newMsg = new Messages(msg);
                await newMsg.save();
            }
            else {
                let msg = {
                    sender: req.user._id,
                    msg: req.body.msg
                }
                let newMsg = await Messages.findOneAndUpdate({ chatRoomId : convRoom._id }, { $push: { messages : msg } }, { new : true });
            }

            return res.status(200).send({ msg: 'Message saved successfully' });
        }
        catch (ex) {
            console.log(ex);
            return res.status(400).send({ "msg": "User not found" });
        }

    }
    else {
        return res.status(422).send({ msg: 'Enter all data' });
    }
}

function checkNewMsg(reqBody) {
    const schema = Joi.object().keys({
        msg: Joi.string().required(),
        receiver: Joi.string().required()
    })

    return Joi.validate(reqBody, schema);
}