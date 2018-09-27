const {Game, Review, User} = require('../models/index')

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
            }
            else{
                Review.create(req.body, {
                    where : { UserId : req.body.UserId, GameId : req.body.GameId}
                })
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
            }}

            console.log(q)
        }
        Game.findAll(q)
            .then(games => {
                res.render('gameHome', {games: games, user: 'admin', session :req.session })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
}

module.exports = ControllerGame
