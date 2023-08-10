import React from "react"
import { deletePolishThunk } from "../../store/polish"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"

const DeletePolish = ({ polish }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const handleDelete = (e) => {
        e.preventDefault()
        return dispatch(deletePolishThunk(polish))
            .then(closeModal)
    }

    return (
        <div className="delete">
            <h1>Confirm delete</h1>
            <h4>Are you sure you want to remove this polish from your shop?</h4>
            <form onSubmit={handleDelete}>
                <div className='update-delete'>
                    <div className='delete-button'>
                        <button type='submit'>
                            Yes
                        </button>
                    </div>
                    <div className='update-button'>
                        <button onClick={closeModal}>
                            No
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DeletePolish
