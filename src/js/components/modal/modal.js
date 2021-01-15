import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CloseModalIcon from '../../../assets/svg/close.svg';

const Modal = () => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.modal.show)
    const options = useSelector(state => state.modal.options)


    if (!showModal) return <></>

    if(showModal) document.body.classList.add('overflow-hidden') 


    const closeModal = (e) => {
        dispatch({ type: 'SET_HIDE_MODAL' })
        dispatch({ type: 'CLEAR_MODAL_OPTIONS' })
        document.body.classList.remove('overflow-hidden') 
    }

    return (
        <div className={`absolute t-0 l-0 w-full h-full overflow-hidden z-index-9 flex justify-center align-center ${options.className ? options.className : ''}`}>
            <div onClick={closeModal} className="absolute t-0 l-0 w-full h-full z-index-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}></div>
            <div className="py-5 px-5 br-6 shadow-material-2 bg-dark relative z-index-4 overflow-hidden" style={{ width: options.width || "50vw", height: options.height || "80vh" }}>
                <CloseModalIcon onClick={closeModal} className="absolute t-5 r-6 w-8 h-8 stroke-grey cursor-pointer bg-grey-dark-light p-2 br-50 hover:bg-dark-3 z-index-1"/>
                {options && options.component && options.component}
            </div>
        </div>
    )
}

export default Modal;