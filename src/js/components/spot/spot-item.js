import React from 'react'
import { Link } from "react-router-dom";
import config from '../../../../config';

import ShareIcon from '../../../assets/svg/share-spot.svg';
import HeartIcon from '../../../assets/svg/heart.svg';


const SpotItem = ({ spot, index }) => {

    let spotImage = null;

    if (spot.image && spot.image.formats && spot.image.formats.small) {
        spotImage = config.API_BASE_URL + spot.image.formats.small.url
    } else if (spot.image && spot.image.url) {
        spotImage = config.API_BASE_URL + spot.image.url
    }

    //TODO link & popularity
    let difficultyProgression = (spot.difficulty / 100) * 100;

    return (
        <Link className="flex align-center h-10 bg-grey-dark-light br-4 mb-3 overflow-hidden hover:bg-grey-black" to={`/spots/details/${spot.slug}`} tabIndex={0} >
            <i className="h-full w-20 overflow-hidden flex relative bg-grey background-image mr-4" style={{ backgroundImage: `url('${spotImage}` }}>
            </i>
            <div className="text-white mr-4 w-40">
                <span className="text-white f4 font-bold italic text-nowrap text-overflow-ellipsis block overflow-hidden">{spot.name}</span>
            </div>
            <div className="flex align-center justify-between flex-1">
                {spot.spot_type && spot.spot_type.name && <div className="flex align-center justify-between px-5 w-30">
                    <span className="text-grey f4 font-bold uppercase">{spot.spot_type.name}</span>
                </div>}
                <div className="flex align-center justify-between px-5">
                    <span className="text-grey f4 pr-4">Popularity</span>
                    <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden flex align-center">
                        <span className="bg-pink absolute h-2 br-50" style={{ width: difficultyProgression + '%', left: '3px' }}></span>
                    </div>
                </div>
                { spot.profile && 
                    <i className="w-8 h-8 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2">
                        {
                            spot.profile.avatar && spot.profile.avatar.url && <img src={config.API_BASE_URL + spot.profile.avatar.url} />
                        }
                    </i>
                }
                <div className="flex flex-col justify-center align-center cursor-pointer fill-grey py-2 px-5">
                    <HeartIcon />
                    <span className="f5 text-grey">20 likes</span>
                </div>
            </div>
        </Link>
    )
}

export default SpotItem