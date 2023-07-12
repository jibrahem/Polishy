import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allPolishesThunk } from '../../store/polish';
import { Link } from 'react-router-dom'

function PolishList() {
    const dispatch = useDispatch()
    const polishObj = useSelector(state => state.polish.allPolishes)
    console.log('polish object', polishObj)
    const polishList = Object.values(polishObj)

    useEffect(() => {
        dispatch(allPolishesThunk())
    }, [dispatch])

    if (!polishList) {
        return null
    }
    return (
        <>
            <main>
                <ul>
                    {polishList.length > 0 && polishList.map(polish => (
                        <div key={polish.id} className='polish'>
                            <Link to={`/polishes/${polish.id}`}></Link>
                            <div className='img'>
                                <img src={polish.image} alt='polish'></img>
                            </div>
                            <div className='desc'>
                                <div>{polish.description}</div>
                            </div>
                            <div className='price'>
                                <div>{polish.price}</div>
                            </div>
                        </div>
                    ))}
                </ul>
            </main>
        </>
    )
}
export default PolishList
