import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalMenuItem from './OpenModalMenuItem';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()

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


    return (
        <ul>
            <li>
                <NavLink exact to="/">Polishy</NavLink>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}


export default Navigation;
