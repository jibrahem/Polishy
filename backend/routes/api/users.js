const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a first name with at least 2 characters.'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('First name cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// Sign up
router.post(
    '',
    validateSignup,
    async (req, res) => {
        const { email, password, firstName } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, firstName, hashedPassword });

        const safeUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

module.exports = router;
