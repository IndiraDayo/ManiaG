const {Category, Game, Review, User} = require('../models/index')


class Controller{
    static showAllGame(req, res){
        Game
        .findAll()
        .then(showAllGame => {
            res.render('index' , {showAllGame, session : req.session})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static userActivity(req, res){
        User
        .findOne({
            include : {model : Game, include : {model : Category}}
        },{
            where : { username : req.params.username}
        })
        .then(userData => {
            // res.send(userData)
            res.render('userActivity', {userData})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static userShowEditForm(req, res){
        User
        .findOne({
            where : { username : req.params.username }
        })
        .then(showForEdit => {
            res.render('editProfile', {showForEdit, session : req.session})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static userEditProfile(req, res){
        User
        .update(req.body, {
            where : { username : req.params.username}
        })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }
}
module.exports = Controller