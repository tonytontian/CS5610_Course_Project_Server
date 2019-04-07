module.exports = function () {
    const mongoose = require('mongoose');
    const connectionString = 'mongodb://admin:movieapp2018@ds039768.mlab.com:39768/heroku_bvjfwgc4';


    /**
     * Code below can be uncommented out to test with local db
     */
    // const databaseName = 'movieapp';
    // var connectionString = 'mongodb://localhost/';
    // connectionString += databaseName;


    mongoose.connect(
        connectionString,
        {useNewUrlParser: true},
        function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', connectionString);
        }
    });
};
