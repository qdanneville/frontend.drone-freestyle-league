import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import config from '../../../../config';

import EditIcon from '../../../assets/svg/edit.svg';
import HeartIcon from '../../../assets/svg/heart.svg';

const BatteryItem = ({ battery, handleClick, fromDroneBatteries, isUsed }) => {

    const [batteryLikes, setbatteryLikes] = useState(0)

    // useEffect(() => {
    //     getSpotLikes(spot.id).then(likes => setSpotLikes(likes));
    // }, [])

    let batteryImage = null;

    if (battery.image && battery.image.formats && battery.image.formats.small) {
        batteryImage = config.API_BASE_URL + battery.image.formats.small.url
    } else if (battery.image && battery.image.url) {
        batteryImage = config.API_BASE_URL + battery.image.url
    }

    let difficultyProgression = (battery.rating / 100) * 100;
    let date = new Date(battery.updated_at);
    date = date.toLocaleDateString('en-US')

    return (
        <div onClick={fromDroneBatteries ? () => handleClick(battery.id, isUsed) : null} className={`flex align-center h-12 bg-grey-dark-light br-4 mb-3 overflow-hidden hover:bg-grey-black shadow-material-2 common-outline ${fromDroneBatteries && 'cursor-pointer'}`} >
            <i className="h-full w-20 overflow-hidden flex relative bg-grey background-image mr-4" style={{ backgroundImage: `url('${batteryImage}` }}>
            </i>
            <div className="text-white mr-4 w-20">
                <span className="text-white f4 italic text-nowrap text-overflow-ellipsis block overflow-hidden">{battery.name}</span>
            </div>
            <div className="flex align-center justify-between flex-1">
                <div className="flex align-center justify-center px-2 w-20 text-align-center">
                    <span className="text-green f6 font-normal uppercase">{battery.battery_type ? battery.battery_type.name : '...'}</span>
                </div>
                <div className="flex align-center justify-center px-2 w-20">
                    <span className="text-green f6 font-normal uppercase">{battery.nb_cells ? battery.nb_cells + 'S' : '...'}</span>
                </div>
                <div className="flex align-center justify-center px-2 w-20">
                    <span className="text-green f6 font-normal uppercase">{battery.mAh ? battery.mAh + ' mAh' : '...'}</span>
                </div>
                <div className="flex align-center justify-center px-2 w-20">
                    <span className="text-green f6 font-normal uppercase">{battery.C ? battery.C + 'C' : '...'}</span>
                </div>
                <div className="flex align-center justify-center w-20">
                    <span className="text-grey-light f4 font-normal text-orange text-align-center">{battery.manufacturer ? battery.manufacturer.name : '...'}</span>
                </div>
                <div className="flex flex-col justify-center align-center fill-grey py-2 px-2 w-20">
                    {battery.vendor_link
                        ? <a href={battery.vendor_link} target="_blank" rel="no-referrer" className="bg-orange f5 text-dark px-4 py-2 br-4">visit</a>
                        : <span className="text-grey uppercase f6 font-normal">no data</span>
                    }
                </div>
                <div className="flex align-center justify-center w-20">
                    <div className="bg-grey-dark w-full h-3 relative br-50 overflow-hidden flex align-center justify-start px-1">
                        <span className="bg-pink h-2 br-50" style={{ width: difficultyProgression + '%' }}></span>
                    </div>
                </div>
                <div className="flex justify-center align-center fill-grey py-2 px-2">
                    <span className="f5 text-grey-light mr-1">{batteryLikes}</span>
                    <HeartIcon />
                </div>
                <div className="flex justify-center align-center fill-grey py-2 px-2 w-10">
                    <span className="f5 text-grey-light">{date}</span>
                </div>
                <div className="flex align-center w-20 h-full justify-end pr-4">
                    <NavLink to={`/gear/batteries/${battery.slug}/edit/`}><EditIcon className="fill-grey w-4 h-4 cursor-pointer" /></NavLink>
                </div>
            </div>
        </div >
    )
}

export default BatteryItem