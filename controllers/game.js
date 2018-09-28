const {Category, Game, Review, User} = require('../models/index')

class ControllerGame{

    static giveRating(req, res){
        Review
        .findOne({
            where : { UserId : req.body.UserId, GameId : req.body.GameId}
        })
        .then(data => {
            // res.redirect('/')
            if(data){
                res.redirect('/')
                Review.update(req.body, {
                    where : { UserId : req.body.UserId, GameId : req.body.GameId}
                })
                .then(() => {
                    res.redirect('/')
                })
            }
            else{
                Review.create(req.body)
                .then(() => {
                    res.redirect('/')
                })
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static giveRatingForm(req, res){
        Game
        .findById(req.params.id)
        .then(showGameById => {
            // res.render('game', {showGameById, session : req.session})
            Game
            .findAll({
                include : { model : User},
                where : { id : req.params.id}
            })
            .then(showAllRatingAndComment => {
                res.render('game', {showGameById, session : req.session, showAllRatingAndComment})
                // res.send(showAllRatingAndComment)
            })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showAllGames(req,res) {
        // res.send('aaa')
        let q = {}
        if (req.query.title) {            
            q = { where: {
                title: {$ilike : `%${req.query.title}%`}
            },
            order : [['updatedAt', 'ASC']]
        }

            console.log(q)
        }
        else{
            q = {
                order : [['updatedAt', 'DESC']]
            }
        }
        Game.findAll(q)
            .then(games => {
                res.render('gameHome', {games: games, session :req.session })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static editGameGetId(req, res){
        User
        .findById(req.session.user.user_id)
        .then(dataAdmin => {
            
            Game
            .findOne({
                include : {model : Category},
                where : { id : req.params.id}
            })
            .then(dataGame => {
                Category
                .findAll()
                .then(category => {
                    // res.send(dataGame)
                    res.render('editGame',{dataAdmin, dataGame,category, session :req.session})
                })
            })
        })
        .catch(err => {
            res.send(err)
        })
    }
    static editGame(req, res){
        Game
        .update(req.body,{
            where : { id : req.params.id}
        })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteGame(req, res){
        Game
        .destroy({
            where : { id : req.params.id}
        })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ControllerGame
