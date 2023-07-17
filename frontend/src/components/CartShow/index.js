import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getUserCartThunk, deleteCartThunk } from '../../store/cart'
import { useLayoutEffect } from 'react'
import './CartShow.css'
import DeleteCart from '../DeleteCart'
import UpdateCart from '../UpdateCart'
import DeletePolish from '../DeletePolish'


const CartShow = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.user.cart)

    useEffect(() => {
        dispatch(getUserCartThunk())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteCartThunk(cart))
            .then(history.push('/'))
    }

    if (!cart) {
        return (
            <div>Add something to your cart!</div>
        )
    }

    if (!user) {
        return (
            <div>Login or register to make a purchase!</div>
        )
    }
    if (user) {

        if (cart) {
            return (
                <div className='cart'>
                    <ul>
                        {cart?.Polishes.map(polish => (
                            <div key={polish.id} className='polish-items'>
                                <div className='cart-pic'>
                                    <li>
                                        <img src={polish.image} alt='polish'></img>
                                    </li>
                                </div>

                                <div className='cart-quan'>
                                    <li>{polish.description}</li>
                                    <li>Quantity: {polish.PolishCart.quantity}</li>
                                    < UpdateCart
                                        cart={cart}
                                        polish={polish} />
                                    <DeletePolish
                                        cart={cart}
                                        polish={polish} />
                                </div>
                                <div className='cart-price'>
                                    <li>Price: ${polish.price * polish.PolishCart.quantity}</li>
                                    <li>(${polish.price} each)</li>
                                </div>
                            </div>

                        ))}
                    </ul>
                    <div className='cart-purchase'>
                        <div className='total-cost'>
                            <div className='bold'>Item(s) total: </div>
                            <div>${cart.totalPrice.toFixed(2)}</div>
                        </div>
                        <div className='shipping'>Free Shipping</div>
                        <div className='final-total'>
                            <div className='bold'>Total ({cart.total} items)</div>
                            <div>${cart.totalPrice.toFixed(2)}</div>
                        </div>
                        <div className='checkout'>
                            <button onClick={handleSubmit}>Checkout</button>
                        </div>
                        <DeleteCart
                            cart={cart} />
                    </div>
                </div>
            )
        }
    }
}

export default CartShow;
