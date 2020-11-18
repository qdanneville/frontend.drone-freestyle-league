import React, { useState, useEffect } from 'react'
import { getSpotLikes } from '../../utils/spot'
import { NavLink } from "react-router-dom";
import config from '../../../../config';

import ShareIcon from '../../../assets/svg/share-spot.svg';
import EditIcon from '../../../assets/svg/edit.svg';
import HeartIcon from '../../../assets/svg/heart.svg';


const SpotItem = ({ spot, index }) => {

    const [spotLikes, setSpotLikes] = useState(0)

    useEffect(() => {
        getSpotLikes(spot.id).then(likes => setSpotLikes(likes));
    }, [])

    let spotImage = null;

    if (spot.image && spot.image.formats && spot.image.formats.small) {
        spotImage = config.API_BASE_URL + spot.image.formats.small.url
    } else if (spot.image && spot.image.url) {
        spotImage = config.API_BASE_URL + spot.image.url
    }

    //TODO link & popularity
    let difficultyProgression = (spot.difficulty / 100) * 100;
    let date = new Date(spot.updated_at);
    date = date.toLocaleDateString('en-US')

    return (
        <NavLink className="flex align-center h-12 bg-grey-dark-light br-4 mb-3 overflow-hidden hover:bg-grey-black" to={`/spots/${spot.slug}`} tabIndex={0} >
            <i className="h-full w-20 overflow-hidden flex relative bg-grey background-image mr-4" style={{ backgroundImage: `url('${spotImage}` }}>
            </i>
            <div className="text-white mr-4 w-40">
                <span className="text-white f4 italic text-nowrap text-overflow-ellipsis block overflow-hidden">{spot.name}</span>
            </div>
            <div className="flex align-center justify-between flex-1">
                <div className="flex align-center justify-between px-5 w-30">
                    <span className="text-grey-light f4 font-normal uppercase">{spot.spot_type ? spot.spot_type.name : '...'}</span>
                </div>
                <div className="flex align-center justify-center w-20">
                    {
                        spot.privacy === 'friends'
                            ? <div className="flex align-center"><i className="w-5 h-5 block bg-pink br-50 bw-2 bc-dark bs-solid"></i><span className="ml-3 f5 font-normal text-grey-light">yes</span></div>
                            : <div className="flex align-center"><i className="w-5 h-5 block bg-grey-dark br-50 bw-2 bc-dark bs-solid"></i><span className="ml-3 f5 font-normal text-grey-light">no</span></div>
                    }
                </div>
                <div className="flex align-center justify-center w-20">
                    <div className="bg-grey-dark w-full h-3 relative br-50 overflow-hidden flex align-center justify-center">
                        <span className="bg-pink absolute h-2 br-50" style={{ width: difficultyProgression + '%', left: '3px' }}></span>
                    </div>
                </div>
                <div className="flex justify-center align-center cursor-pointer fill-grey py-2 px-5">
                    <span className="f5 text-grey-light mr-1">{spotLikes}</span>
                    <HeartIcon />
                </div>
                <div className="flex justify-center align-center cursor-pointer fill-grey py-2 px-5 w-10">
                    <span className="f5 text-grey-light">{date}</span>
                </div>
                {spot.profile ?
                    <div className="flex align-center w-20 h-full justify-end pr-4">
                        < i className="w-8 h-8 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2">
                            {
                                spot.profile.avatar && spot.profile.avatar.url && <img src={config.API_BASE_URL + spot.profile.avatar.url} />
                            }
                        </i>
                    </div>
                    :
                    <div className="flex align-center w-20 h-full justify-end pr-4">
                        <ShareIcon className="fill-grey mr-4" />
                        <EditIcon className="fill-grey w-4 h-4" />
                    </div>
                }

            </div>
        </NavLink >
    )
}

export default SpotItem