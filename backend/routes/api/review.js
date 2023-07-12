const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Polish, Review } = require('../../db/models');
const router = express.Router();


//GET the signed in users reviews
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const Reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName']
            },
            {
                model: Polish,
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        ]
    })

    let reviewList = [];
    for (let i = 0; i < Reviews.length; i++) {
        const review = Review[i]
        reviewList.push(review.toJSON())
    }
    return res.json({ Reviews: reviewList })
})

//UPDATE a users review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    const { review, stars } = req.body
    const editReview = await Review.findByPk(req.params.reviewId);
    if (!editReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }
    if (editReview.userId !== user.id) {
        res.status(403).json({
            message: 'Forbidden'
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
    if(review){
        editReview.review = review;
    }
    if(stars){
        editReview.stars = stars;
    }
    await editReview.save()
    return res.json(editReview)
})


//DELETE a users review
router.delete('/:reviewId', requireAuth, async (req, res) =>{
    const {user} = req;
    const review = await Review.findByPk(req.params.reviewId);
    if(!review){
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }
    if(review.userId !== user.id){
        return res.status(403).json({
            message: "Forbidden"
        })
    }
    await review.destroy()
    return res.json({
        message: "Successfully deleted"
    })
})

module.exports = router
