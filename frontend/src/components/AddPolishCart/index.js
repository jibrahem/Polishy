import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addPolishToCartThunk, getUserCartThunk } from '../../store/cart'
import './AddPolishCart.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const AddPolishCart = ({ polish }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)
    const cart = useSelector(state => state.cart.user.cart)

    const handleSubmit = async (e) => {
        e.preventDefault()
        cart.Polishes.push(polish)
        await dispatch(addPolishToCartThunk(polish, cart))
            .then(getUserCartThunk())
            .then(history.push('/carts'))

    }

    return (
        <>
            <div className='ship'><i class="fa-solid fa-check"></i>Arrives soon! Get it by next week if you order today</div>
            <form onSubmit={handleSubmit}>
                <div className='quan'>Quantity</div>
                <select name="quantity" id="quantity-select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    <option value='1'>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className='submit-button'>
                    <button>Add to cart</button>
                </div>
            </form>
        </>
    )
}

export default AddPolishCart
