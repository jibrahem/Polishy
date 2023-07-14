const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Polish, Review } = require('../../db/models');
const router = express.Router();

//GET ALL POLISHES
router.get('/', async (req, res) => {
    const allPolishes = await Polish.findAll({
        include: [
            { model: Review }
        ]
    })
    return res.json(allPolishes)
})

//GET POLISH BY POLISH ID
router.get('/:polishId', async (req, res) => {
    const polish = await Polish.findByPk(req.params.polishId, {
        include: [
            {
                model: User, as: 'Seller',
                attributes: ['id', 'firstName']
            },
            { model: Review }
        ]
    })
    if (!polish) {
        return res.status(404).json({
            message: "Polish couldn't be found"
        })
    }
    const count = await Review.count({
        where: req.params
    })
    polish.dataValues.numReviews = count;
    let sum = 0
    polish.Reviews.forEach(review => {
        sum += review.stars
    })
    polish.dataValues.avgStarRating = sum / polish.Reviews.length;

    return res.json(polish)
})

//GET REVIEWS FOR A CERTAIN POLISH
router.get('/:polishId/reviews', async (req, res) => {
    const polish = await Polish.findByPk(req.params.polishId);
    if (!polish) {
        return res.status(404).json({
            message: "Polish couldn't be found"
        })
    }
    const Reviews = await Review.findAll({
        where: { polishId: polish.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName']
            }
        ]
    });
    return res.json({ Reviews })
})

//POST a review for a polish
router.post('/:polishId/reviews', requireAuth, async (req, res) => {
    const { review, stars, image } = req.body;
    const { user } = req
    const polish = await Polish.findByPk(req.params.polishId);
    if (!polish) {
        return res.status(404).json({
            message: "Polish couldn't be found"
        })
    }
    const getReview = await Review.findAll({
        where: {
            polishId: polish.id,
            userId: user.id
        }
    })
    if (getReview.length) {
        return res.status(500).json({
            message: 'User already has a review for this polish'
        })
    }

    const errors = {}
    if (!review) {
        errors.review = "Review text is required"
    }
    if (!stars || typeof stars !== Number && stars < 1 || typeof stars !== Number && stars > 5) {
        errors.stars = "Stars rating is required";
    }
    if (Object.values(errors).length !== 0) {
        return res.status(400), json({
            message: 'Bad Request',
            errors: errors
        })
    }
    const newReview = await Review.create({
        polishId: polish.id,
        userId: user.id,
        image: image,
        review,
        stars
    })
    return res.status(201).json(newReview)
})



module.exports = router;
