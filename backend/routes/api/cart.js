const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Polish, Review, PolishCart, Cart } = require('../../db/models');
const router = express.Router();

//GET CURRENT USER CART

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    if (!user) {
        return res.status(402).json({
            message: 'Need to login to make a purchase'
        })
    }
    const cart = await Cart.findOne({
        where: { userId: user.id },
        include: [
            {
                model: Polish
            }
        ]
    })

    let sum = 0;
    let total = 0;
    cart.Polishes.forEach(polish => {
        sum += polish.price * polish.PolishCart.quantity
        total += polish.PolishCart.quantity
    })
    cart.dataValues.totalPrice = sum;
    cart.dataValues.total = total

    if (!cart) {
        return user.createCart()
    }
    return res.json({ cart })
})


// ADD items into a users cart
router.post('/:polishId/cart', requireAuth, async (req, res) => {
    const { user } = req
    const {quantity} = req.body
    const polish = await Polish.findByPk(req.params.polishId)
    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    })

    const newCart = await PolishCart.create({
        quantity: quantity,
        polishId: polish.id,
        cartId: cart.id
    })

    await newCart.save()
    return res.json(newCart)
})

// UPDATE items from a users cart
router.put('/:cartId', requireAuth, async (req, res) => {
    const { user } = req;
    const { quantity } = req.body
    const editCart = await Cart.findByPk(req.params.cartId)

    if (!editCart) {
        return res.status(404).json({
            message: "Cart couldn't be found"
        })
    }
    if (editCart.userId !== user.id) {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
    console.log('edit cart in the backend', editCart)
    editCart.PolishCart.quantity = quantity
    await editCart.save()
    return res.json(editCart)

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
