import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { updatePolishThunk, getOnePolishThunk } from '../../store/polish';

const UpdatePolish = () => {
    let { polishId } = useParams()
    polishId = Number(polishId)
    const polish = useSelector((state) => state.polish.singlePolish)
    console.log('polish', polish)
    const history = useHistory()
    const dispatch = useDispatch()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOnePolishThunk(polishId))
    }, [dispatch, polishId]);

    useEffect(() => {
        if (polish) {
            setDescription(polish.description);
            setPrice(polish.price)
        }
    }, [polish])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const polishObj = {
            ...polish,
            userId: user.id,
            description: description,
            price: Number(price),

        }

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

        const updatedPolish = await dispatch(updatePolishThunk(polishObj))
        console.log('updatedpolish', updatedPolish)
        if (Object.values(errors).length) {
            setErrors(errors)
        } else {
            history.push(`/polishes/${updatedPolish.id}`)
        }
    }

    if (!polish) {
        return null
    }

    return (
        <>
            <div className='post-polish'>
                <h1>Update Polish</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Update the description for your polish:</h3>

                    <div className='polish-desc'>

                        <div className='errors'>{errors.description}</div>
                        <textarea
                            placeholder=' description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <h3>
                        Update the price:
                    </h3>
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

                    <div className='errors'>{errors.price}</div>
                    <div className='create-button'>
                    <button type='submit'>Update Polish</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdatePolish;
