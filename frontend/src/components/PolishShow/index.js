import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getOnePolishThunk } from "../../store/polish";
import './PolishShow.css'
import { useDispatch, useSelector } from "react-redux";

const PolishShow = () => {
    const dispatch = useDispatch()
    let { polishId } = useParams()
    polishId = Number(polishId)
    console.log(polishId)

    const polish = useSelector(state => state.polish.singlePolish)
    console.log('polish', polish)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOnePolishThunk(polishId))
    }, [dispatch, polishId])

    if(!polish){
        return null
    }

    return (
        <section>
            <div className="polish-box">
             <img src={polish.image} alt='polish'></img>
             <div>{polish.description}</div>
            </div>
            <div className="price">
                {polish.price}
            </div>
            
        </section>
    )
}

export default PolishShow
