import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateCartThunk } from '../../store/cart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import './UpdateCart.css'

const UpdateCart = ({ polish, cart }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(cart)
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const editCart = () => {
            
        }
        await dispatch(updateCartThunk(cart))
            .then(history.push('/carts'))

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>Quantity</div>
                <select name="quantity" id="quant" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    <option value='1'>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className='update-button'>
                    <button>Update cart</button>
                </div>
            </form>
        </>
    )
}

export default UpdateCart
