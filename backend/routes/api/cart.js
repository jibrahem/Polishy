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
    if (!cart) {
        return user.createCart()
    }

    let sum = 0;
    let total = 0;
    cart.Polishes.forEach(polish => {
        sum += polish.price * polish.PolishCart.quantity
        total += polish.PolishCart.quantity
    })
    cart.dataValues.totalPrice = sum;
    cart.dataValues.total = total


    return res.json({ cart })
})


// ADD items into a users cart
router.post('/:polishId/cart', requireAuth, async (req, res) => {
    const { user } = req
    const { quantity } = req.body
    const polish = await Polish.findByPk(req.params.polishId)
    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    })
    if (!cart) {
        return user.createCart()
    }
    const newCart = await PolishCart.create({
        quantity: quantity,
        polishId: polish.id,
        cartId: cart.id
    })

    await newCart.save()
    return res.json(newCart)
})

// UPDATE items from a users cart
router.put('/:polishId/cart', requireAuth, async (req, res) => {
    const { user } = req;
    const { quantity } = req.body
    const polish = await Polish.findByPk(req.params.polishId)
    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    })
    if (!cart) {
        return res.status(404).json({
            message: "Cart couldn't be found"
        })
    }
    if (cart.userId !== user.id) {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
    const polishCart = await PolishCart.findOne({
        where: {
            polishId: polish.id
        }
    })

    const updateCart = await polishCart.update({
        quantity: quantity,
        polishId: polish.id,
        cartId: cart.id
    })

    await updateCart.save()
    return res.json(updateCart)

})

//DELETE a polish from shopping cart

router.delete('/:polishId/delete', requireAuth, async (req, res) => {
    const { user } = req;
    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    })
    const polish = await Polish.findByPk(req.params.polishId)
    // const polishCart = await PolishCart.findOne({
    //     where: {
    //         polishId: polish.id
    //     }
    // })
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

    await polish.destroy()
    return res.json({
        message: "Successfully deleted"
    })
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
