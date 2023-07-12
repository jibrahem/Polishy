const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Polish, Review } = require('../../db/models');
const router = express.Router();

//GET ALL POLISHES
router.get('/', async (req, res) => {
    const allPolishes = Polish.findAll({
        include: [
            { model: Review }
        ]
    })
    return res.json(allPolishes)
})

//GET POLISH BY POLISH ID
router.get('/:polishId', async (req, res) => {
    const polish = Polish.findByPk(req.params.polishId, {
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



module.exports = router;
