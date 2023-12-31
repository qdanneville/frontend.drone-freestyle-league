import React from 'react';
import SpotUserInteraction from '../spot/spot-user-interaction'
import spotImage from '../spot/spot-image';
import config from '../../../../config';


const SpotPopup = ({ spot }) => {

    //TODO link & popularity
    let difficultyProgression = (spot.difficulty / 100) * 100;

    return (
        <div className="flex flex-col py-2" id={`popup-${spot.id}`}>
            <h3 className="mt-0 mb-2 f3 italic font-bold text-overflow-ellipsis overflow-hidden max-width-90-percent">{spot.name}</h3>
            <i className="w-full h-30 overflow-hidden br-6 flex background-image" style={{ backgroundImage: `url(${spotImage(spot.image)})` }}></i>
            <SpotUserInteraction spotId={spot.id} />
            <div className="py-2 bs-solid bt-w-1 bb-w-1 bl-w-0 br-w-0 bc-grey-dark my-2 flex justify-between align-center">
                <i className="w-10 h-10 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${spot.profile.avatar && (config.API_BASE_URL + spot.profile.avatar.url)})` }}></i>
                <div className="flex flex-col justify-end text-align-right">
                    <span className="f4 text-white font-bold uppercase">{spot.profile.display_name}</span>
                    {spot && spot.profile && spot.profile.slug && <a href={`/profile/${spot.profile.slug}`} className="underline f5 font-bold text-teal-dark cursor-pointer mt-2">See profile</a>}
                </div>
            </div>
            {spot.spot_type && spot.spot_type.name && <div className="flex align-center justify-between mt-2">
                <span className="text-grey f5 italic pr-4">Spot type</span>
                <span className="text-grey f5 font-bold">{spot.spot_type.name}</span>
            </div>}
            <div className="flex align-center justify-between">
                <span className="text-grey f5 italic pr-4">Difficulty</span>
                <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden flex align-center justify-start px-1">
                    <span className="bg-orange h-2 br-50" style={{ width: difficultyProgression + '%' }}></span>
                </div>
            </div>
            <div className="flex align-center justify-between">
                <span className="text-grey f5 italic pr-4">Popularity</span>
                <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden flex align-center justify-start px-1">
                    <span className="bg-pink h-2 br-50" style={{ width: difficultyProgression + '%' }}></span>
                </div>
            </div>
            <div className="mt-4 max-height-100-px overflow-y-scroll">
                <span className="">{spot.description}</span>
            </div>
            {/* //TODO use a link from react router */}
            <a href={`/spots/${spot.slug}`} className="btn-secondary teal px-4 mt-4 text-align-center f5">Spot details</a>
        </div>
    )
}

export default SpotPopup;