const { Users } = require('../models/user');
var _ = require('lodash');

exports.search = async (req, res) => {
    const name = req.query.name;

    if(!name){
        return res.status(422).send({ msg : 'Name is required' });
    }

    const usersRecord = await Users.find({ name : { $regex : name, $options: 'i' }, confirmed : true });

    return res.status(200).send({ data : (_.map(usersRecord, o => _.pick(o, ['name', 'email', 'contact', '_id']))) });
}