module.exports = function (){
    return function (req, res, next) {
        if(!req.headers['Authorization']){
            return res.status(400).send({ msg : 'Unauthorized User' });
        }else{
            next();
        }
    }
}