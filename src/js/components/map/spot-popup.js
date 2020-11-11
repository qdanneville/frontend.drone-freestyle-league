import React from 'react';
import config from '../../../../config';

import ShareIcon from '../../../assets/svg/share-spot.svg';
import HeartIcon from '../../../assets/svg/heart.svg';
import ReportIcon from '../../../assets/svg/info.svg'

const SpotPopup = ({ spot }) => {
    console.log(spot)
    let spotImage = null;

    if (spot.image && spot.image.formats && spot.image.formats.small) {
        spotImage = <img className="w-full" src={config.API_BASE_URL + spot.image.formats.small.url} />
    } else if (spot.image && spot.image.url) {
        spotImage = <img className="w-full" src={config.API_BASE_URL + spot.image.url} />
    }

    //TODO link & popularity
    let difficultyProgression = (spot.difficulty / 100) * 100;

    return (
        <div className="flex flex-col py-2" id={`popup-${spot.id}`}>
            <h3 className="mt-0 mb-2 f3 italic font-bold text-overflow-ellipsis overflow-hidden max-width-90-percent">{spot.name}</h3>
            <i className="w-full overflow-hidden br-4 flex">
                {
                    spotImage && spotImage
                }
            </i>
            <ul className="flex justify-between align-center mt-3">
                <li className="flex flex-col justify-center align-center cursor-pointer fill-grey">
                    <ReportIcon />
                    <span className="f5 text-grey">Report</span>
                </li>
                <li className="flex flex-col justify-center align-center cursor-pointer fill-grey">
                    <ShareIcon />
                    <span className="f5 text-grey">Share</span>
                </li>
                <li className="flex flex-col justify-center align-center cursor-pointer fill-grey">
                    <HeartIcon />
                    <span className="f5 text-grey">20 likes</span>
                </li>
            </ul>
            <div className="py-2 bs-solid bt-w-1 bb-w-1 bl-w-0 br-w-0 bc-grey-dark my-2 flex justify-between align-center">
                <i className="w-10 h-10 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2">
                    {
                        spot.profile.avatar && spot.profile.avatar.url && <img src={config.API_BASE_URL + spot.profile.avatar.url} />
                    }
                </i>
                <div className="flex flex-col justify-end text-align-right">
                    <span className="f4 text-white font-bold uppercase">{spot.profile.display_name}</span>
                    <span className="underline f4 font-bold text-teal-dark cursor-pointer">See profile</span>
                </div>
            </div>
            {spot.spot_type && spot.spot_type.name && <div className="flex align-center justify-between mt-2">
                <span className="text-grey f5 italic pr-4">Spot type</span>
                <span className="text-grey f5 font-bold">{spot.spot_type.name}</span>
            </div>}
            <div className="flex align-center justify-between">
                <span className="text-grey f5 italic pr-4">Difficulty</span>
                <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden">
                    <span className="bg-orange absolute t-0 l-0 h-full" style={{ width: difficultyProgression + '%' }}></span>
                </div>
            </div>
            <div className="flex align-center justify-between">
                <span className="text-grey f5 italic pr-4">Popularity</span>
                <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden">
                    <span className="bg-pink-light absolute t-0 l-0 h-full" style={{ width: difficultyProgression + '%' }}></span>
                </div>
            </div>
            <div className="mt-4 max-height-100-px overflow-y-scroll">
                <span className="">{spot.description}</span>
            </div>
            {/* //TODO use a link from react router */}
            <a href={`/spots/details/${spot.slug}`} className="btn-secondary teal px-4 mt-4 text-align-center f5">Spot details</a>
        </div>
    )
}

export default SpotPopup;