import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CreatePublicationSettings from './create-publication-settings'
import config from '../../../../config'

import GearIcon from '../../../assets/svg/my-fleet.svg'
import SpotIcon from '../../../assets/svg/my-spots.svg'
import ImageIcon from '../../../assets/svg/image.svg'

const CreatePublication = () => {


    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const modalIsShown = useSelector(state => state.modal.show)

    console.log(modalIsShown);

    const openPublicationModal = () => {
        const modalContent = {
            component: <CreatePublicationSettings />,
            width: '500px',
            height: 'auto'
        }

        dispatch({ type: 'SET_MODAL_OPTIONS', payload: modalContent })
        dispatch({ type: 'SET_SHOW_MODAL' })
    }

    return (
        <div className="flex flex-col bg-grey-dark-light br-6 p-4">
            <div className="flex items-center w-full">
                <div className="flex">
                    {
                        user.profile.profile.avatar
                            ? <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image" style={{ backgroundImage: `url(${config.API_BASE_URL + user.profile.profile.avatar.url})` }}></i>
                            : <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 bg-grey"></i>
                    }
                </div>
                <div className="ml-2 flex-1 br-20 w-full bg-grey-dark-light px-4 py-3 cursor-pointer hover:bg-dark-3" onClick={openPublicationModal}>
                    <span className="text-grey f4">Write a publication</span>
                </div>
            </div>
            <i className="h-3px w-full block w-full bg-grey-dark-light br-40 mt-4"></i>
            <div>
                <ul className="flex items-center justify-evenly pt-3">
                    <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={openPublicationModal}>
                        <ImageIcon className="w-5 h-5 fill-white" />
                        <span className="text-grey f4 ml-4">Photo</span>
                    </li>
                    <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={openPublicationModal}>
                        <GearIcon className="w-6 h-6 fill-green" />
                        <span className="text-grey f4 ml-4">Gear</span>
                    </li>
                    <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={openPublicationModal}>
                        <SpotIcon className="w-6 h-6 fill-yellow" />
                        <span className="text-grey f4 ml-4">Spot</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CreatePublication