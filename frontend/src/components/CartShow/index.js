import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getUserCartThunk } from '../../store/cart'
import './CartShow.css'
import DeleteCart from '../DeleteCart'


const CartShow = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.user.cart)


    useEffect(() => {
        dispatch(getUserCartThunk())
    }, [dispatch])

    if (!cart) {
        return (
            <>Add something to your cart!</>
        )
    }
    console.log('cart user', cart)

    return (
        <div className='cart'>
            <ul>
                {cart.Polishes.map(polish => (
                    <div>
                        <li>
                            <img src={polish.image} alt='polish'></img>
                        </li>
                        <li>{polish.description}</li>
                        <li>Price: ${polish.price * polish.PolishCart.quantity}</li>
                        <li>(${polish.price} each)</li>
                        <li>Quantity: {polish.PolishCart.quantity}</li>
                        <li></li>
                    </div>
                ))}
            </ul>
            <div>Item(s) total</div>
            <DeleteCart
            cart={cart}/>
        </div>
    )
}

export default CartShow;
