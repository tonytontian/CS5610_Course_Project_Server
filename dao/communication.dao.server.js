const updateModel = require('../models/update.model.server');
const followModel = require('../models/follow.model.server');
const mongoose = require('mongoose')

//UPDATES
createUpdate = (criticId, update) =>
    updateModel.create({
        text: update.text,
        user: mongoose.Types.ObjectId(criticId)
    })

getUpdateById = id =>
    updateModel.find({_id: id})

getAllUpdates = () =>
    updateModel.find()

getUpdatesByCritic = (criticId) =>
    updateModel.find({user: mongoose.Types.ObjectId(criticId)})


deleteUpdateById = id =>
    updateModel.deleteOne({_id: id})


//FOLLOWS
followCritic = (movieGoerId, criticId) =>
    followModel.create({
        critic: criticId,
        moviegoer: movieGoerId
    })

unfollowCritic = (movieGoerId, criticId) =>
    followModel.deleteOne({
        critic: criticId,
        moviegoer: movieGoerId
    })

getAllFollows = () =>
    followModel.find()

getFollowById = id =>
    followModel.find({_id: id})

getFollowersByCritic = (criticId) =>
    followModel.find({critic: mongoose.Types.ObjectId(criticId)})

getFollowsByMovieGoer = (movieGoerId) =>
    followModel.find({moviegoer: mongoose.Types.ObjectId(movieGoerId)})


module.exports = {
    createUpdate,
    getUpdateById,
    getAllUpdates,
    getUpdatesByCritic,
    deleteUpdateById,
    followCritic,
    unfollowCritic,
    getAllFollows,
    getFollowById,
    getFollowersByCritic,
    getFollowsByMovieGoer,
    getUpdatesForMovieGoer: function (id) {
        let followed = []
        return this.getFollowsByMovieGoer(id)
            .then(res => {
                res.map((follow) => followed.push(follow.critic))
                return followed
            })
            .then(() => updateModel.find({
                user: {
                    $in: followed
                }
            }))
    }

}