const userModel = require('../models/user.model.server');

createUser = user =>
    userModel.create(user)

findAllUsers = () =>
    userModel.find().sort({signUp: -1});

findUserById = userId =>
    userModel.findOne({_id: userId});

findUserByUsername = username =>
    userModel.findOne({username: username});

updateUser = (uid, user) =>
    userModel.updateOne({_id: uid}, {$set: user});

deleteUser = userId =>
    userModel.deleteOne({_id: userId});

deleteAllUsers = () =>
    userModel.deleteMany({});

findUserByCredentials = (username, password) =>
    userModel.findOne(({username: username, password: password}), function(err, result){
        if (!result){
            return false;
        }
    })

module.exports = {
    findAllUsers,
    createUser,
    findUserById,
    findUserByUsername,
    updateUser,
    deleteUser,
    deleteAllUsers,
    findUserByCredentials,
}