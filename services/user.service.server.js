const userDao = require('../dao/user.dao.server');

module.exports = app => {
    createUser = (req, res) =>
        userDao.createUser(req.body)
            .then(user => res.json(user));

    findAllUsers = (req, res) =>
        userDao.findAllUsers()
            .then(users => res.json(users));


    findUserById = (req, res) =>
        userDao.findUserById(req.params['uid'])
            .then(user => res.json(user));

    findUserByCredentials = (req, res) =>
        userDao.findUserByCredentials(req.params['username', 'password'])
            .then(user => res.json(user));

    deleteUser = (req, res) =>
        userDao.deleteUser(req.params.uid)
            .then(userDao.findAllUsers())
            .then(users => res.json(users));

    updateUser = (req, res) =>
        userDao.updateUser(req.params.uid, req.body)
            .then(user => res.json(user));

    register = (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var type = req.body.type;

        userDao.findUserByUsername(username)
            .then(function (user) {
                if (!user) {
                    var newUser = {
                        username: username,
                        password: password,
                        email: email,
                        type: type
                    };
                    userDao.createUser(newUser)
                        .then(function (user) {
                            req.session.userId = user._id;
                            res.json(user)
                        });
                    req.session.userId = user._id;
                }
                else {
                    res.sendStatus(403);
                }
            })
    }

    login = (req, res) => {
        //console.log(req.body)
        var username = req.body.username;
        var password = req.body.password;
        userDao
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    req.session.userId = user._id;
                    console.log("storing user id, " + req.session.userId);
                    res.send(user);
                } else {
                    console.log('sending 403')
                    res.sendStatus(403);
                }
            });
    }

    logout = (req, res) => {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) return console.log(err);
            });
        }
        res.sendStatus(200);
    }

    getCurrentUser = (req, res) => {
        //console.log("getting current user, id = " + req.session.userId);
        userDao.findUserById(req.session.userId)
            .then(response =>
            {
                res.send(response)
            });
    }



    app.get('/api/user', findAllUsers)
    app.post('/api/user', createUser)
    app.get('/api/user/:uid', findUserById)
    app.delete('/api/user/:uid', deleteUser)
    app.put('/api/user/:uid', updateUser)
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.get('/api/user/:username/:password', findUserByCredentials);
    app.get('/api/profile', getCurrentUser);


}