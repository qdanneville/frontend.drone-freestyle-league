import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import config from '../../../../config';
import { getSpotLikes } from '../../utils/spot'

import spotImageUtils from './spot-image'
import HeartIcon from '../../../assets/svg/heart.svg';

const SpotItemSquared = ({ spot }) => {

    let _isMounted = false;

    const [spotLikes, setSpotLikes] = useState(0)

    useEffect(() => {
        _isMounted = true;
        getSpotLikes(spot.id).then(likes => _isMounted && setSpotLikes(likes));

        return (() => {
            _isMounted = false;
        })
    }, [])

    return (
        <NavLink to={`/spots/${spot.slug}`} className="flex w-33-per w-half-md w-full-xs transition">
            <div className="flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs ">
                <div style={{ width: '40%' }} className="relative br-10 box-shadow-1 overflow-hidden background-image block h-full w-30" style={{ backgroundImage: `url(${spotImageUtils(spot.image)})` }}></div>
                <div style={{ width: '60%' }} className="flex-1 flex flex-col px-4 py-4">
                    <div className="w-full">
                        <span className="block f4 text-grey-light font-bold text-overflow-ellipsis overflow-hidden text-nowrap">{spot.name}</span>
                    </div>
                    <span className="f4 text-grey font-normal mt-2 text-orange">{spot.privacy}</span>
                    <div className="flex w-full justify-end">
                        <span className="f4 text-grey font-normal flex align-center">{spotLikes} <HeartIcon className="w-4 h-4 fill-grey ml-1" /></span>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default SpotItemSquared