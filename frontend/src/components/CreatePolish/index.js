import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { createPolishThunk } from '../../store/polish';
import './CreatePolish.css'

const CreatePolish = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPolish = {
            userId: user.id,
            description: description,
            price: Number(price),
            image: image
        }
        console.log('new polish', newPolish)
        const errors = {}

        if (!description) {
            errors.description = 'Description is required'
        }
        if (description && description.length > 65) {
            errors.description = 'Description must be 65 characters or less';
        }
        if (!price) {
            errors.price = 'Price is required'
        };
        if (!image) {
            errors.image = 'Image is required'
        }
        if (Object.values(errors).length) {
            setErrors(errors)
        } else {
            const createdPolish = await dispatch(createPolishThunk(newPolish))
            console.log('createwd polis', createdPolish)
            history.push(`/polishes/${createdPolish.id}`)
        }
    }
    const updateFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <>
            <div className='post-polish'>
                <h1>Create a new Polish</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Add a description of the look & color of the polish:</h3>
                    <label>
                        <div className='polish-desc'>
                            <div className='errors'>{errors.description}</div>
                            <textarea
                                placeholder=' Add short description here ...'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </label>
                    <h3>Price your polish:</h3>
                    <label>
                        <div className='price'>
                            $ <input
                                type='number'
                                placeholder=' Price'
                                min='.99'
                                step='1'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className='errors'>{errors.price}</div>
                    <h3>
                        Upload an image of the polish:
                    </h3>
                    <input type="file" onChange={updateFile} accept=".jpg, .jpeg, .png" />
                    <div className='errors'>{errors.image}</div>
                    <div className='create-button'>
                        <button type='submit'>Create Polish</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePolish;
