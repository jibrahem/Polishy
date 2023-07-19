import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateCartThunk, getUserCartThunk, addPolishToCartThunk } from '../../store/cart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import './UpdateCart.css'

const UpdateCart = ({ polish, cart }) => {
    console.log('polish trying to add', polish)
    console.log('cart in update', cart)
    const history = useHistory()
    const dispatch = useDispatch()
    const list = Object.values(cart)
    const filterCart = list.find(({ id }) => id === polish.id)
    const [quantity, setQuantity] = useState(filterCart.quantity)
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)
    console.log('filtered cart trying to create', filterCart)



    const handleSubmit = async (e) => {
        e.preventDefault()
        const editCart = {
            ...polish,
            quantity: Number(quantity),
        }

        const updateCart = await dispatch(updateCartThunk(editCart))
        return dispatch(getUserCartThunk())

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <select name="quantity" id="quant" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    <option value={Number(1)}>1</option>
                    <option value={Number(2)}>2</option>
                    <option value={Number(3)}>3</option>
                    <option value={Number(4)}>4</option>
                    <option value={Number(5)}>5</option>
                </select>
                <div className='update-cart'>
                    <button>Update cart</button>
                </div>
            </form>
        </>
    )
}

export default UpdateCart
