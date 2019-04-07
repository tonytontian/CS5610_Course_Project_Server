const movieDao = require('../dao/movie.dao.server');

module.exports = app => {

    // MOVIES
    createMovie = (req, res) =>
        movieDao.createMovie(req.body)
            .then(movie => res.json(movie));

    getMovieByIMDBId = (req, res) =>
        movieDao.getMovieByIMDBId(req.params['id'])
            .then(movie => res.json(movie));

    getAllMovies = (req, res) =>
        movieDao.getAllMovies()
            .then(movies => res.json(movies));

    getMovieByDatabaseId = (req, res) =>
        movieDao.getMovieByDatabaseId(req.params['id'])
            .then(movies => res.json(movies));



    // LIKES

    likeMovie = (req, res) =>
        movieDao.likeMovie(req.body, req.params['uid'])
            .then(like => res.json(like))

    getAllLikes = (req, res) =>
        movieDao.getAllLikes()
            .then(likes => res.json(likes));

    getLikeById = (req, res) =>
        movieDao.getLikeById(req.params['id'])
            .then(like => res.json(like));

    getLikesForMovie = (req, res) =>
        movieDao.getLikesForMovie(req.params['mid'])
            .then(likes => res.json(likes));

    getLikesForUser = (req, res) =>
        movieDao.getLikesForUser(req.params['uid'])
            .then(likes => res.json(likes));

    deleteLike = (req, res) =>
        movieDao.deleteLike(req.params['mid'],req.params['uid'])
            .then(response =>res.json(response))


    //REVIEWS
    reviewMovie = (req, res) =>{
        console.log(req.body);
        movieDao.deleteReview(req.params['uid'], req.params['mid'])
            .then(response => movieDao.reviewMovie(req.params['mid'], req.params['uid'], req.body))
            .then(response => res.json(response))
    }


    getAllReviews = (req, res) =>
        movieDao.getAllReviews()
            .then(reviews => res.json(reviews));

    getReviewById = (req, res) =>
        movieDao.getReviewById(req.params['id'])
            .then(review => res.json(review));

    getReviewsForMovie = (req, res) =>
        movieDao.getReviewsForMovie(req.params['mid'])
            .then(reviews => res.json(reviews));


    getReviewsForUser = (req, res) =>
        movieDao.getReviewsForUser(req.params['uid'])
            .then(reviews => res.json(reviews));

    deleteReview = (req, res) =>
        movieDao.deleteReview(req.params['uid'], req.params['mid'])
            .then(response =>res.json(response));

    //movies
    app.post('/api/movie', createMovie);
    app.get('/api/movie', getAllMovies);
    app.get('/api/movie/:id', getMovieByIMDBId);
    app.get('/api/movie/db/:id', getMovieByDatabaseId);

    //likes
    app.post('/api/like/user/:uid', likeMovie);
    app.get('/api/like', getAllLikes);
    app.get('/api/like/:id', getLikeById);
    app.get('/api/movie/:mid/like', getLikesForMovie);
    app.get('/api/like/user/:uid', getLikesForUser);
    app.delete('/api/like/user/:uid/movie/:mid', deleteLike)

    //reviews
    app.post('/api/movie/:mid/user/:uid/review', reviewMovie);
    app.get('/api/review', getAllReviews);
    app.get('/api/review/:id', getReviewById);
    app.get('/api/movie/:mid/review', getReviewsForMovie);
    app.get('/api/review/user/:uid', getReviewsForUser);
    app.delete('/api/review/user/:uid/movie/:mid', deleteReview)


}