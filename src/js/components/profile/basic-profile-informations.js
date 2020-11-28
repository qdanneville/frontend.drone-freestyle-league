import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPilotSpotsCount } from '../../utils/spot'
import { getProfileFollowersNumber, getProfileFolloweesNumber } from '../../utils/profile'
import ProfileCommunity from './profile-community'

const BasicInformations = ({ profile, className, update }) => {

    const dispatch = useDispatch();
    const modalIsShown = useSelector(state => state.modal.show)

    const [spotsCount, setSpotsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followeesCount, setFolloweesCount] = useState(0);

    const [showCommunity, setShowCommunity] = useState(null);

    useEffect(() => {
        getPilotSpotsCount(profile.type.pilot_id)
            .then(spots => setSpotsCount(spots))

        getProfileFollowersNumber(profile.slug)
            .then(followersNb => setFollowersCount(followersNb))

        getProfileFolloweesNumber(profile.slug)
            .then(followeesNb => setFolloweesCount(followeesNb))
    }, [update, modalIsShown])

    //Reset click followers state when the modal is closed
    useEffect(() => {
        if (!modalIsShown) {
            setShowCommunity(null)
        }
    }, [modalIsShown])

    //Dispatch corresponding component for the modal
    useEffect(() => {
        if (showCommunity) {

            const modalContent = {
                component: <ProfileCommunity type={showCommunity} slug={profile.slug} name={profile.display_name} avatar={profile.avatar} />
            }

            dispatch({ type: 'SET_MODAL_OPTIONS', payload: modalContent })
            dispatch({ type: 'SET_SHOW_MODAL' })
        }

    }, [showCommunity])

    return (
        <div className={`py-4 px-2 bg-dark br-6 shadow-7 ${className}`}>
            <ul className="flex">
                <li className="flex flex-col align-center justify-center flex-1 w-20">
                    <span className="text-white f4 font-normal">{spotsCount}</span>
                    <span className="text-grey-dark f4 font-normal">Spots</span>
                </li>
                <li onClick={() => setShowCommunity('followers')} className="flex flex-col align-center justify-center flex-1 w-20 ml-2 hover-orange cursor-pointer">
                    <span className="text-white f4 font-normal">{followersCount}</span>
                    <span className="text-grey-dark f4 font-normal">Followers</span>
                </li>
                <li onClick={() => setShowCommunity('following')} className="flex flex-col align-center justify-center flex-1 w-20 ml-2 mr-3 hover-orange cursor-pointer">
                    <span className="text-white f4 font-normal">{followeesCount}</span>
                    <span className="text-grey-dark f4 font-normal ">Following</span>
                </li>
            </ul>
        </div>
    )
}

export default BasicInformations