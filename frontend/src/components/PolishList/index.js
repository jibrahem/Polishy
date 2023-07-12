import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allPolishesThunk } from '../../store/polish';
import { Link } from 'react-router-dom'
import './PolishList.css'

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
        <div className='top-text'>Discover fresh nail finds from creative sellers!</div>
            <div className='front-image'>
                <ul>
                    <li>
                        <img src='https://irinaiacobblog.files.wordpress.com/2022/07/summer-nail-ideas.png?w=730&h=700&crop=1' alt='nails'></img>
                        <img src='https://irinaiacobblog.files.wordpress.com/2022/07/summer-nail-ideas.png?w=730&h=700&crop=1' alt='nails'></img>
                        <img src='https://irinaiacobblog.files.wordpress.com/2022/07/summer-nail-ideas.png?w=730&h=700&crop=1' alt='nails'></img>
                        <img src='https://irinaiacobblog.files.wordpress.com/2022/07/summer-nail-ideas.png?w=730&h=700&crop=1' alt='nails'></img>
                        <img src='https://irinaiacobblog.files.wordpress.com/2022/07/summer-nail-ideas.png?w=730&h=700&crop=1' alt='nails'></img>
                        <img src='https://irinaiacobblog.files.wordpress.com/2022/07/summer-nail-ideas.png?w=730&h=700&crop=1' alt='nails'></img>

                    </li>
                </ul>
            </div>
            <main>
                <ul>
                    {polishList.length > 0 && polishList.map(polish => (
                        <div key={polish.id} className='polish'>
                            <Link to={`/polishes/${polish.id}`}>
                                <div className='img'>
                                    <img src={polish.image} alt='polish'></img>
                                </div>
                                <div className='desc'>
                                    <div>{polish.description}</div>
                                </div>
                                <div className='price'>
                                    <div>{polish.price}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </ul>
            </main>
        </>
    )
}
export default PolishList
