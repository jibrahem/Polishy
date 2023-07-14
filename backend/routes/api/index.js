// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const polishesRouter = require('./polish.js')
const reviewsRouter = require('./review.js')
const cartsRouter = require('./cart.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/polishes', polishesRouter)

router.use('/reviews', reviewsRouter);

router.use('/carts', cartsRouter)

module.exports = router;
