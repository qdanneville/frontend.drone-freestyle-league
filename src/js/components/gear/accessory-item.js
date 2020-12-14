import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import config from '../../../../config';

import EditIcon from '../../../assets/svg/edit.svg';
import HeartIcon from '../../../assets/svg/heart.svg';

const AccessoryItem = ({ accessory }) => {

    const [accessoryLikes, setAccessoryLikes] = useState(0)

    // useEffect(() => {
    //     getSpotLikes(spot.id).then(likes => setSpotLikes(likes));
    // }, [])

    let accessoryImage = null;

    if (accessory.image && accessory.image.formats && accessory.image.formats.small) {
        accessoryImage = config.API_BASE_URL + accessory.image.formats.small.url
    } else if (accessory.image && accessory.image.url) {
        accessoryImage = config.API_BASE_URL + accessory.image.url
    }

    let difficultyProgression = (accessory.rating / 100) * 100;
    let date = new Date(accessory.updated_at);
    date = date.toLocaleDateString('en-US')

    return (
        <div className="flex align-center h-12 bg-grey-dark-light br-4 mb-3 overflow-hidden hover:bg-grey-black shadow-material-2 common-outline" >
            <i className="h-full w-20 overflow-hidden flex relative bg-grey background-image mr-4" style={{ backgroundImage: `url('${accessoryImage}` }}>
            </i>
            <div className="text-white mr-4 w-40">
                <span className="text-white f4 italic text-nowrap text-overflow-ellipsis block overflow-hidden">{accessory.name}</span>
            </div>
            <div className="flex align-center justify-between flex-1">
                <div className="flex align-center justify-center px-2 w-30">
                    <span className="text-green f6 font-normal uppercase">{accessory.gear_type ? accessory.gear_type.name : '...'}</span>
                </div>
                <div className="flex align-center justify-center w-20">
                    <span className="text-grey-light f4 font-normal text-orange text-align-center">{accessory.manufacturer ? accessory.manufacturer.name : '...'}</span>
                </div>
                <div className="flex flex-col justify-center align-center fill-grey py-2 px-2 w-20">
                    {accessory.vendor_link
                        ? <a href={accessory.vendor_link} target="_blank" rel="no-referrer" className="bg-orange f5 text-dark px-4 py-2 br-4">visit</a>
                        : <span className="text-grey uppercase f6 font-normal">no data</span>
                    }
                </div>
                <div className="flex align-center justify-center w-20">
                    <div className="bg-grey-dark w-full h-3 relative br-50 overflow-hidden flex align-center justify-start px-1">
                        <span className="bg-pink h-2 br-50" style={{ width: difficultyProgression + '%' }}></span>
                    </div>
                </div>
                <div className="flex justify-center align-center fill-grey py-2 px-2">
                    <span className="f5 text-grey-light mr-1">{accessoryLikes}</span>
                    <HeartIcon />
                </div>
                <div className="flex justify-center align-center fill-grey py-2 px-2 w-10">
                    <span className="f5 text-grey-light">{date}</span>
                </div>
                <div className="flex align-center w-20 h-full justify-end pr-4">
                    <NavLink to={`/gear/accessories/${accessory.slug}/edit/`}><EditIcon className="fill-grey w-4 h-4 cursor-pointer" /></NavLink>
                </div>
            </div>
        </div >
    )
}

export default AccessoryItem