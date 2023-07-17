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
                        <img src='https://nailaesthetic.com/wp-content/uploads/2022/10/angelic-nails-inspiration-and-ideas-featured.jpg' alt='nails'></img>
                        <img src='https://www.asimplewallflower.com/wp-content/uploads/2022/06/summernailsideas.jpg' alt='nails'></img>
                        <img src='https://s.yimg.com/ny/api/res/1.2/flWDVH_YA6bHwNmnVMPb0Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTY0MA--/https://media.zenfs.com/en/cosmopolitan_438/ad337f57c835893f5461e0c4fe6b528a' alt='nails'></img>
                        <img src='https://cdn.shopify.com/s/files/1/0183/4271/files/IMG_7738_480x480.jpg?v=1629737454' alt='nails'></img>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdTAfQtPmeAET2pbsXeS07H2OTIPqTi4CUiQ&usqp=CAU' alt='nails'></img>

                    </li>
                </ul>
            </div>
            <main>
                <ul>
                    {polishList.length > 0 && polishList.map(polish => (
                        <div key={polish.id} className='polish'>
                            {console.log(polish)}
                            <Link to={`/polishes/${polish.id}`}>
                                <div className='img'>
                                    <img src={polish.image} alt='polish'></img>
                                </div>
                                <div className='desc'>
                                    {polish.description}
                                </div>
                                {polish.avgRating === null &&
                                    <div><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>({polish.Reviews.length})</div>
                                }
                                {(polish.avgRating === 1 || (polish.avgRating > .5 && polish.avgRating < 1.5)) &&
                                    <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>({polish.Reviews.length})</div>
                                }
                                {(polish.avgRating === 2 || (polish.avgRating > 1.5 && polish.avgRating < 2.5)) &&
                                    <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>({polish.Reviews.length})</div>
                                }
                                {(polish.avgRating === 3 || (polish.avgRating >= 2.5 && polish.avgRating < 3.5)) &&
                                    <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>({polish.Reviews.length})</div>
                                }
                                {(polish.avgRating === 4 || (polish.avgRating >= 3.5 && polish.avgRating < 4.5))&&
                                    <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i>({polish.Reviews.length})</div>
                                }
                                {(polish.avgRating === 5 || (polish.avgRating >= 4.5))&&
                                    <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i>({polish.Reviews.length})</div>
                                }

                                <div className='price'>
                                    <div>${polish.price}</div>
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
