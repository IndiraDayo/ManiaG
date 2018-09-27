const {Review, User} = require('../models/index')


class Controller{
    static userActivity(req, res){
        User
        .findOne({
            include : {model : Review}
        },{
            where : { username : req.params.username}
        })
        .then(userData => {
            res.send(userData)
        })
        .catch(err => {
            res.send(err)
        })
    }
}
module.exports = Controller