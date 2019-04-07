const communicationDao = require('../dao/communication.dao.server');
const userDao = require('../dao/user.dao.server')

module.exports = app => {

    //UPDATES
    createUpdate = (req, res) =>
        communicationDao.createUpdate(req.params['uid'], req.body)
            .then(update => res.json(update))

    getAllUpdates = (req, res) =>
        communicationDao.getAllUpdates()
            .then(updates => res.json(updates));

    getUpdateById = (req, res) =>
        communicationDao.getUpdateById(req.params['id'])
            .then(update => res.json(update))

    getUpdatesByCritic = (req, res) =>
        communicationDao.getUpdatesByCritic(req.params['uid'])
            .then(likes => res.json(likes))

    getUpdatesForMovieGoer = (req, res) =>
        communicationDao.getUpdatesForMovieGoer(req.params['uid'])
            .then(updates => res.json(updates))

    deleteUpdateById = (req, res) =>
        communicationDao.deleteUpdateById(req.params['id'])
            .then(result => res.json(result))


    //FOLLOWS
    followCritic = (req, res) =>
        communicationDao.followCritic(req.params['uid'], req.params['cid'])
            .then(follow => res.json(follow))

    unfollowCritic = (req, res) =>
        communicationDao.unfollowCritic(req.params['uid'], req.params['cid'])
            .then(f => res.json(f))

    getAllFollows = (req, res) =>
        communicationDao.getAllFollows()
            .then(follows => res.json(follows));

    getFollowById = (req, res) =>
        communicationDao.getFollowById(req.params['id'])
            .then(follow => res.json(follow))

    getFollowersByCritic = (req, res) =>
        communicationDao.getFollowersByCritic(req.params['uid'])
            .then(follows => res.json(follows));

    getFollowsByMovieGoer = (req, res) =>
        communicationDao.getFollowsByMovieGoer(req.params['uid'])
            .then(follows => res.json(follows));


    app.post('/api/update/user/:uid', createUpdate);
    app.get('/api/update', getAllUpdates);
    app.get('/api/update/:id', getUpdateById);
    app.get('/api/update/user/:uid', getUpdatesByCritic);
    app.get('/api/update/moviegoer/:uid', getUpdatesForMovieGoer);
    app.delete('/api/update/:id', deleteUpdateById);

    app.post('/api/follow/moviegoer/:uid/critic/:cid', followCritic);
    app.post('/api/unfollow/moviegoer/:uid/critic/:cid', unfollowCritic);
    app.get('/api/follow', getAllFollows);
    app.get('/api/follow/:id', getFollowById);
    app.get('/api/follow/critic/:uid', getFollowersByCritic);
    app.get('/api/follow/moviegoer/:uid', getFollowsByMovieGoer);


}