import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import config from '../../../../config';

import HeartIcon from '../../../assets/svg/heart.svg';

const SpotItemSquared = ({ name, type, image, slug, category, manufacturer }) => {

    let _isMounted = false;

    const [gearLikes, setGearLikes] = useState(0)

    useEffect(() => {
        _isMounted = true;
        // getgearLikes(spot.id).then(likes => _isMounted && setgearLikes(likes));

        return (() => {
            _isMounted = false;
        })
    }, [])

    let gearImage

    if (image && image.formats && image.formats.small) {
        gearImage = config.API_BASE_URL + image.formats.small.url
    } else if (image && image.url) {
        gearImage = config.API_BASE_URL + image.url
    }

    return (
        <NavLink to={`/gear/${type}/${slug}/edit`} className="flex w-full transition">
            <div className="flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full">
                <div style={{ width: '40%' }} className="relative br-10 box-shadow-1 overflow-hidden background-image block h-full w-30" style={{ backgroundImage: `url(${gearImage})` }}></div>
                <div style={{ width: '60%' }} className="flex-1 flex flex-col px-4 py-4">
                    <div className="w-full">
                        <span className="block f4 text-grey-light font-bold text-overflow-ellipsis overflow-hidden text-nowrap">{name}</span>
                    </div>
                    <span className="f4 text-grey font-normal mt-2 text-green">{category}</span>
                    <span className="f4 text-grey font-normal mt-2 text-orange">{manufacturer}</span>
                    <div className="flex w-full justify-end">
                        <span className="f4 text-grey font-normal flex align-center">{gearLikes} <HeartIcon className="w-4 h-4 fill-grey ml-1" /></span>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default SpotItemSquared