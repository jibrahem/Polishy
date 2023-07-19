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
    const cart = await PolishCart.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Polish,
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        ]
    })
    if (!cart) {
        return user.createPolishCart()
    }

    let sum = 0;
    let total = 0;
    cart.forEach(oneCart => {
        sum += oneCart.Polish.price * oneCart.quantity
        total += oneCart.quantity
        oneCart.dataValues.totalPrice = sum;
        oneCart.dataValues.total = total
    })
    let cartList = []
    for (let i = 0; i < cart.length; i++) {
        const oneCart = cart[i]
        cartList.push(oneCart.toJSON())
    }
    return res.json({ Carts: cartList })
})


// ADD polish into a users cart
router.post('/:polishId/cart', requireAuth, async (req, res) => {
    const { user } = req
    const { quantity } = req.body
    const polish = await Polish.findByPk(req.params.polishId)
    if (!polish) {
        return res.status(404).json({
            message: "Polish couldn't be found"
        })
    }
    const getCart = await PolishCart.findAll({
        where: {
            polishId: polish.id,
            userId: user.id
        }
    })

    // if (getCart.length) {
    //     return res.status(500).json({
    //         message: 'User already has this polish in their cart'
    //     })
    // }

    const newPolishCart = await PolishCart.create({
        polishId: polish.id,
        userId: user.id,
        quantity: quantity
    })

    await newPolishCart.save()
    return res.status(201).json(newPolishCart)
})

// UPDATE items from a users cart
router.put('/:cartId', requireAuth, async (req, res) => {
    const { user } = req;
    const { quantity } = req.body
    const editCart = await PolishCart.findByPk(req.params.cartId)
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

    if (quantity) {
        editCart.quantity = quantity
    }

    await editCart.save()
    return res.json(editCart)

})

//DELETE a polish from shopping cart

router.delete('/:cartId/delete', requireAuth, async (req, res) => {
    const { user } = req;
    const cart = await PolishCart.findByPk(req.params.cartId)
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
