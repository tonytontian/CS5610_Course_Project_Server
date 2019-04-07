const movieModel = require('../models/movie.model.server');
const likeModel = require('../models/like.model.server');
const reviewModel = require('../models/review.model.server');
const mongoose = require('mongoose')

//MOVIES
createMovie = movie =>
    movieModel.create(movie)

getMovieByIMDBId = id =>
    movieModel.findOne({imdbID: id})

getAllMovies = () =>
    movieModel.find()

deleteMovie = id =>
    movieModel.deleteOne({_id: id});

getMovieByDatabaseId = (id) =>
    movieModel.findOne({_id: id});

//LIKES
likeMovie = (movie, userId) =>

    //check to see if movie is already in our database
    movieModel.findOne({imdbID: movie.imdbID}, function (err, results) {


        //if no, add it before liking
        if (results===null) {
            movieModel.create(movie)
                .then(response =>
                    likeModel.create({
                        user: userId,
                        movie: response['imdbID']
                    }))
        }
        //if movie is already in database, just like it
        else {
            likeModel.create({
                user: userId,
                movie: results['imdbID']
            })
        }
    })

getAllLikes = () =>
    likeModel.find().sort({time: -1})

getLikeById = (id) =>
    likeModel.find({_id: id})

getLikesForMovie = (imdb) =>
    likeModel.find({movie: imdb})

getLikesForUser = (userId) =>
    likeModel.find({user: userId})

deleteLike = (imdbID, userId) =>
    likeModel.deleteOne({movie: imdbID, user:userId});


//Reviews

reviewMovie = (imdbID, userId, review) =>
    //check to see if movie is already in our database
    movieModel.findOne({imdbID: imdbID}).then(results => {
        //if no, add it before reviewing
        if (results == null) {
            return(
                movieModel.create({
                imdbID: imdbID
            })
                .then(movie =>
                    reviewModel.create({
                        rating: review.rating,
                        explanation: review.explanation,
                        user: userId,
                        movie: movie.imdbID
                    }))
            )
        }
        //if movie is already in database, just review it
        else {
            console.log(results)
            return(
            reviewModel.create({
                rating: review.rating,
                explanation: review.explanation,
                user: userId,
                movie: results.imdbID
            }))
        }
    })

getAllReviews = () =>
    reviewModel.find().sort({time: -1})

getReviewById = (id) =>
    reviewModel.find({_id: id})

getReviewsForMovie = (imdb) =>
    reviewModel.find({movie: imdb})

getReviewsForUser = (userId) =>
    reviewModel.find({user: mongoose.Types.ObjectId(userId)})

deleteReview= (uid, imdb) =>
    reviewModel.deleteOne({user: uid, movie:imdb});

module.exports = {
    createMovie,
    getAllLikes,
    getLikeById,
    getLikesForMovie,
    getLikesForUser,
    getMovieByIMDBId,
    reviewMovie,
    getAllReviews,
    getReviewById,
    getReviewsForMovie,
    getReviewsForUser,
    likeMovie,
    getAllMovies,
    deleteLike,
    deleteMovie,
    deleteReview,
    getMovieByDatabaseId

}