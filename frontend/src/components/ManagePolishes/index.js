import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPolishesThunk } from '../../store/polish';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './ManagePolishes.css'
import { useRef } from 'react';
import DeletePolish from '../DeletePolish';

const ManagePolishes = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false)
    const user = useSelector(state => state.session.user)
    const polishObj = useSelector(state => state.polish.allPolishes)

    const list = Object.values(polishObj)

    const polishList = list.filter((polish) => polish.userId === user.id)

    const ulRef = useRef()

    useEffect(() => {
        dispatch(getUserPolishesThunk())
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const create = () => {
        history.push('/polishes/new')
    }

    if (!polishList) {
        return null
    }

    return (
        <main>
            <div className='manage-polishes'>
                <h1>Manage your polishes</h1>
                <button onClick={create}>
                    Create a new Polish
                </button>
            </div>
            <ul>
                {polishList.length > 0 && polishList.map(polish => (
                    <div key={polish.id} className='polish'>
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
                            {(polish.avgRating === 4 || (polish.avgRating >= 3.5 && polish.avgRating < 4.5)) &&
                                <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i>({polish.Reviews.length})</div>
                            }
                            {(polish.avgRating === 5 || (polish.avgRating >= 4.5)) &&
                                <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i>({polish.Reviews.length})</div>
                            }

                            <div className='price'>
                                <div>${polish.price}</div>
                            </div>
                        </Link>
                        <div className='update-delete'>
                            <div className='update-button'>
                                <button onClick={() => history.push(`/polishes/${polish.id}/edit`)}>
                                    Update
                                </button>
                            </div>
                            <div className='delete-button'>
                                <OpenModalMenuItem
                                    buttonText="Delete"
                                    onItemClick={closeMenu}
                                    modalComponent={<DeletePolish
                                        polish={polish} />}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </main>
    )
}

export default ManagePolishes;
