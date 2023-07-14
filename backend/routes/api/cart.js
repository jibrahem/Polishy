const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Polish, Review, PolishCart, Cart } = require('../../db/models');
const router = express.Router();

//GET CURRENT USER CART

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const cart = await Cart.findOne({
        where: { userId: user.id },
        include: [
            {
                model: Polish
            }
        ]
    })
    return res.json({ cart })
})


// ADD items into a users cart
router.post('/:cartId', requireAuth, async (req, res) => {
    const { user } = req
})

// UPDATE items from a users cart
router.put('/:cartId', requireAuth, async (req, res) => {
    const { user } = req;
})

// DELETE a users cart

router.delete('/:cartId', requireAuth, async (req, res) => {
    const { user } = req;
    const cart = await Cart.findByPk(req.params.cartId)
    if (!cart) {
        res.status(404).json({
            message: "Cart couldn't be found"
        })
    }
    if (cart.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
    await cart.destroy()
    return res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
