const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
    '/',
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
