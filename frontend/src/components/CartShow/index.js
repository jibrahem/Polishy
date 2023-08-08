import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getUserCartThunk, deletePolishThunk } from '../../store/cart'
import './CartShow.css'
import UpdateCart from '../UpdateCart'
import DeletePolish from '../DeletePolish'


const CartShow = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.user.Carts)

    useEffect(() => {
        dispatch(getUserCartThunk())
    }, [dispatch])

    const orderPlaced = () => {
        window.alert('Your order has been placed')
    }

    const totalItem = (cart) => {
        let sum = 0
        cart.forEach(oneCart => {
            sum += oneCart.quantity
        })
        return sum
    }

    const totalPrice = (cart) => {
        let sum = 0;
        cart.forEach(oneCart => {
            sum += oneCart.Polish.price * oneCart.quantity
        })
        return sum
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        cart.forEach(oneCart => {
            dispatch(deletePolishThunk(oneCart))
            dispatch(getUserCartThunk())
            history.push('/')
        })
        return orderPlaced()
    }

    if (!cart) {
        return null
    }

    if (!user) {
        return (
            <div>Login or register to make a purchase!</div>
        )
    }
    if (!cart.length) {
        return (
            <div className='no-cart'>
                <div className='cart-empty'>
                    Your cart is empty.
                </div>
                <NavLink exact to={'/'}>Discover something unique to fill it up</NavLink>
            </div>
        )
    }

    const sortedCart = cart.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })

    if (user) {
        if (cart.length) {
            return (
                <div className='cart'>
                    <ul>
                        {cart.map(polish => (
                            <div key={polish.id} className='polish-items'>
                                <div className='cart-pic'>
                                    <li>
                                        <img src={polish.Polish.image} alt='polish'></img>
                                    </li>
                                </div>
                                <div className='cart-quan'>
                                    <li>{polish.Polish.description}</li>
                                    <li>Quantity: {polish.quantity}</li>
                                    < UpdateCart
                                        cart={cart}
                                        polish={polish} />
                                    <DeletePolish
                                        cart={cart}
                                        polish={polish} />
                                </div>
                                <div className='cart-price'>
                                    <li>Price: ${polish.Polish.price * polish.quantity}</li>
                                    <li>(${polish.Polish.price} each)</li>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <div className='cart-purchase'>
                        <div className='total-cost'>
                            <div className='bold'>Item(s) total: </div>
                            <div>${totalPrice(cart).toFixed(2)}</div>
                        </div>
                        <div className='shipping'>Free Shipping</div>
                        <div className='final-total'>
                            <div className='bold'>Total ({totalItem(cart)} items)</div>
                            <div>${totalPrice(cart).toFixed(2)}</div>
                        </div>
                        {cart.length &&
                            <div className='checkout'>
                                <button onClick={handleSubmit} onSubmit={orderPlaced}>Checkout</button>
                            </div>
                        }
                    </div>
                </div>
            )
        }
    }
}

export default CartShow;
