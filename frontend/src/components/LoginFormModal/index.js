import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
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


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demo = () => {
        return dispatch(sessionActions.login({
            credential: 'raven@aa.io',
            password: 'password'
        }))
            .then(closeModal)
    }

    return (
        <>
            <div className="signin-form">
                <form onSubmit={handleSubmit}>
                <div className="reg">
                    <h4>Sign in</h4>
                    <OpenModalMenuItem
                        buttonText="Register"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                </div>
                    <label>
                        Email address
                        <input
                            type="email"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <div className="errors">
                        {errors.credential && (
                            <p>{errors.credential}</p>
                        )}
                    </div>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="submit-button">
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>
            <div className="demo">
            <button onClick={demo}>Demo User</button>
            </div>
        </>
    );
}

export default LoginFormModal;
