import React, { useState, useEffect } from 'react';
import { getSpotLikes as getSpotLikesUtils, getUserHasLikedThisSpot as getUserHasLikedThisSpotUtils, toggleLikeSpot as toggleLikeSpotUtils } from '../../utils/spot'
import { getStorageProfile } from '../../utils/local-storage'

import ShareIcon from '../../../assets/svg/share-spot.svg';
import HeartIcon from '../../../assets/svg/heart.svg';
import ReportIcon from '../../../assets/svg/info.svg';

const SpotUserInteraction = ({ spotId, className }) => {

    let _isMounted = false;

    const [spotLikes, setSpotLikes] = useState(null);
    const [userHasLikedThisSpot, setUserHasLikedThisSpot] = useState(false);
    const profileId = getStorageProfile();

    useEffect(() => {
        _isMounted = true;
        getSpotLikesUtils(spotId).then(likes => _isMounted && setSpotLikes(likes));
        getUserHasLikedThisSpotUtils(spotId, profileId).then(liked => _isMounted && setUserHasLikedThisSpot(liked))


        return (() => {
            _isMounted = false;
        })
    }, [])

    const toggleLikeSpot = () => {
        toggleLikeSpotUtils(spotId, profileId).then(response => {
            getSpotLikesUtils(spotId).then(likes => setSpotLikes(likes));
            getUserHasLikedThisSpotUtils(spotId, profileId).then(liked => setUserHasLikedThisSpot(liked))
        })
    }

    return (
        <ul className={`flex justify-between align-center mt-3 br-10 bg-grey-black px-4 py-3 ${className}`}>
            <li className="flex flex-col justify-center align-center cursor-pointer fill-grey">
                <ReportIcon />
                <span className="f5 text-grey mt-1">Report</span>
            </li>
            <li className="flex flex-col justify-center align-center cursor-pointer fill-grey mx-5">
                <ShareIcon />
                <span className="f5 text-grey mt-1">Share</span>
            </li>
            <li className="flex flex-col justify-center align-center cursor-pointer fill-grey" onClick={toggleLikeSpot} >
                <HeartIcon className={userHasLikedThisSpot ? 'fill-red' : 'fill-grey'} />
                <span className="f5 text-grey mt-1">{`${spotLikes > 1 ? spotLikes + ' likes' : spotLikes + ' like'}`}</span>
            </li>
        </ul>
    )
}

export default SpotUserInteraction;