const mongoose = require('mongoose');

const messageSchema =  new mongoose.Schema({
    chatRoomId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ChatRoom',
        required : true
    },
    messages : [
        {
            createdAt : {
                type : Date,
                required : true,
                default : Date.now()
            },
            sender : {
                type : mongoose.Schema.Types.ObjectId,
                required : true
            },
            msg : {
                type : String,
                required : true
            }
        }
    ]
});

const Messages = mongoose.model('message', messageSchema);

module.exports = {Messages};