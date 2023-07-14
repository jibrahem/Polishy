import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    if (!user) {
        return (
            <div className="signin">
                <OpenModalMenuItem
                    buttonText="Sign in"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                />
            </div>
        )
    } else {
        return (
            <>
                <button onClick={openMenu}>
                    <i class="fa-solid fa-user"></i>
                </button>
                <ul className={ulClassName} ref={ulRef}>
                    <>
                        <li>{user.firstName}</li>
                        <li>{user.email}</li>
                        <li>
                            <NavLink exact to='/reviews/current'>
                                Reviews
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                </ul>
            </>
        )
    }
}

export default ProfileButton;
