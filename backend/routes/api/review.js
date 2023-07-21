const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Polish, Review, ReviewImage } = require('../../db/models');
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
            },

            {
                model: ReviewImage,
            },
        ]
    })


    let reviewList = [];
    for (let i = 0; i < Reviews.length; i++) {
        const review = Reviews[i]
        reviewList.push(review.toJSON())
    }
    return res.json({Reviews: reviewList})
})

//POST an image for a review
router.post('/:reviewId/images', singleMulterUpload("image"), requireAuth, async (req, res) => {
    const { user } = req;
    const url = req.file ?
        await singleFileUpload({ file: req.file, public: true }) :
        null;

    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    }
    const count = await ReviewImage.count({
        where: { reviewId: review.id }
    });
    if (review.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    if (count > 1) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        });
    }

    const reviewImage = await ReviewImage.create({
        url,
        reviewId: review.id,
    });

    return res.json({reviewImage});
});

//UPDATE a users review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    const { review, stars, image } = req.body
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
    if (review) {
        editReview.review = review;
    }
    if (image) {
        editReview.image = image;
    }
    if (stars) {
        editReview.stars = stars;
    }
    await editReview.save()
    return res.json(editReview)
})


//DELETE a users review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }
    if (review.userId !== user.id) {
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
