const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Polish, Review } = require('../../db/models');
const router = express.Router();

//GET ALL POLISHES
router.get('/', async (req, res) => {
    const polishes = await Polish.findAll({
        include: [
            { model: Review }
        ]
    })
    let allPolishes = [];
    polishes.forEach(polish => {
        allPolishes.push(polish.toJSON());
    });
    allPolishes.forEach(polish => {
        let sum = 0;
        polish.Reviews.forEach(review => {
            sum += review.stars;
        });
        polish.avgRating = sum / polish.Reviews.length;
    });
    return res.json(allPolishes)
})


//GET USERS POLISHES
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const polishes = await Polish.findAll({
        where: { userId: user.id },
        include: [
            { model: Review }
        ]
    })
    let allPolishes = [];
    polishes.forEach(polish => {
        allPolishes.push(polish.toJSON());
    });
    allPolishes.forEach(polish => {
        let sum = 0;
        polish.Reviews.forEach(review => {
            sum += review.stars;
        });
        polish.avgRating = sum / polish.Reviews.length;
    });
    return res.json({ allPolishes })
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
    polish.dataValues.avgRating = sum / polish.Reviews.length;

    return res.json(polish)
})


//POST A NEW POLISH

router.post('/', singleMulterUpload("image"), requireAuth, async (req, res) => {
    const { description, price } = req.body

    const image = req.file ?
        await singleFileUpload({ file: req.file, public: true }) :
        '';

    const { user } = req;

    const errors = {}

    if (!description) {
        errors.description = 'Description required'
    }

    if (!price) {
        errors.price = "Price is required"
    }

    if (!image) {
        errors.image = "Image is required"
    }

    if (Object.values(errors).length !== 0) {
        return res.status(400), json({
            message: 'Bad Request',
            errors: errors
        })
    }

    const polish = await Polish.create({
        userId: user.id,
        description: description,
        price: price,
        image: image,
    })

    polish.price = Number(polish.price)
    return res.status(201).json(polish)
})

//UPDATE POLISH

router.put('/:polishId', requireAuth, async (req, res) => {
    const { user } = req;
    const { description, price } = req.body;
    const polish = await Polish.findByPk(req.params.polishId);
    if (!polish) {
        return res.status(404).json({
            message: "Polish couldn't be found"
        })
    }

    if (polish.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const errors = {}

    if (!description) {
        errors.description = 'Description required'
    }

    if (!price) {
        errors.price = "Price is required"
    }

    if (Object.values(errors).length !== 0) {
        return res.status(400), json({
            message: 'Bad Request',
            errors: errors
        })
    }

    if (description) {
        polish.description = description
    }

    if (price) {
        polish.price = price
    }

    await polish.save();

    return res.json(polish)
})

// DELETE USERS POLISH

router.delete('/:polishId', requireAuth, async (req, res) => {
    const { user } = req;
    const polish = await Polish.findByPk(req.params.polishId);
    if (!polish) {
        return res.status(404).json({
            message: "Polish couldn't be found"
        })
    }
    if (polish.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
    await polish.destroy()
    return res.json({
        message: "Successfully deleted"
    })
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
router.post('/:polishId/reviews', singleMulterUpload("image"), requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const image = req.file ?
        await singleFileUpload({ file: req.file, public: true }) :
        '';
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
        return res.status(400).json({
            message: 'Bad Request',
            errors: errors
        })
    }
    const newReview = await Review.create({
        polishId: polish.id,
        userId: user.id,
        review,
        stars: Number(stars),
        image,
    })
    return res.json({ newReview })
})



module.exports = router;
