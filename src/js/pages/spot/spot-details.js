import React, { useState, useEffect } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import api from '../../utils/api'
import config from '../../../../config'

import Loader from '../../components/loader'
import EditIcon from '../../../assets/svg/edit.svg';

import spotImage from '../../components/spot/spot-image';
import SpotUserInteraction from '../../components/spot/spot-user-interaction'
import UserLevel from '../../components/user-level';
import Advisories from '../../components/advisories/'
import BackButton from '../../components/back-button';

const SpotDetails = (props) => {

    const { slug } = useParams();
    const history = useHistory();

    const [spot, setSpot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [spotAdvisories, setSpotAdvisories] = useState(null);

    useEffect(() => {
        api.get(`spots/${slug}`)
            .then(response => {
                if (response.data) setSpot(response.data)
                setIsLoading(false);

                //Once we've got the spot, we could retrieve updated airspace advisories
                api.get(`/airspaces?lng=${response.data.longitude}&lat=${response.data.latitude}`)
                    .then(response => {
                        setSpotAdvisories(response.data);
                    })
            })
            .catch(err => history.push('/spots/'))
    }, [])

    const profileCreationDate = spot && spot.profile ? new Date(spot.profile.created_at).toLocaleDateString('en-US') : null

    let difficultyProgression = spot && (spot.difficulty / 100) * 100;

    if (isLoading) return <Loader className="relative" />

    return (
        <div className="w-full">
            <div>
                <header className="flex flex-col w-full px-10 pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full sticky t-0 z-index-7 bg-dark pt-10">
                    <div className="flex justify-between align-center mb-3 w-full">
                        <BackButton />
                        {spot.canEdit && <Link to={`/spots/${slug}/edit/`} className="text-dark fill-dark f4 flex justify-center align-center bg-grey-light hover:bg-grey py-2 px-4 br-4 cursor-pointer"> <EditIcon className="stroke-15 w-4 h-4 mr-3" />Edit spot</Link>}
                    </div>
                </header>
                <div className="flex common-container">
                    <div className="flex flex-col align-center w-full">
                        <div className="relative spot-image flex justify-center align-start w-full br-10 box-shadow-1 overflow-hidden background-image block" style={{ backgroundImage: `url(${spotImage(spot.image)})` }}>
                            <h1 className="text-white good-times f2 my-0 uppercase pt-10">{spot.name}</h1>
                            <SpotUserInteraction spotId={spot.id} className="absolute b-1 r-1" />
                        </div>
                        <div className="spot-profile z-index-1 flex flex-col justify-center align-center text-align-center py-4 px-10 bg-dark br-10">
                            {spot.profile ?
                                <div className="flex flex-col align-center">
                                    <i className="w-20 h-20 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${spot.profile.avatar && (config.API_BASE_URL + spot.profile.avatar.url)})` }}></i>
                                </div>
                                :
                                <div className="flex">
                                    <i className="w-20 h-20 br-50 bg-grey shadow-1 overflow-hidden bs-solid bc-white bw-2">
                                    </i>
                                </div>
                            }
                            <div className="flex flex-col align-center mt-2">
                                <span className="text-grey f2 uppercase mb-2"><strong className="text-white font-bold">{spot.profile ? spot.profile.display_name : 'Unknown'}</strong></span>
                                <UserLevel level={spot.pilot.level} currentPoints={spot.pilot.current_points} displayFirst={'level'} />
                                <span className="text-grey f4 my-1">Member since  <strong className="text-white font-bold">{profileCreationDate ? profileCreationDate : 'Unknown'}</strong></span>
                                {spot && spot.profile && spot.profile.slug && <Link to={`/profile/${spot.profile.slug}`} className="underline f5 font-bold text-teal-dark cursor-pointer mt-2">See profile</Link>}
                            </div>
                        </div>
                        <i className="bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full"></i>
                        <div className="flex w-full pt-4">
                            <div className="flex flex-col w-half">
                                <div className="flex-flex-col bg-grey-dark-light mr-2 br-4 py-4 px-4">
                                    <header className="w-full flex justify-start">
                                        <h3 className="text-orange f6 uppercase good-times font-normal mt-0">Spot informations</h3>
                                    </header>
                                    {spot.spot_type && spot.spot_type.name && <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Type</span>
                                        <span className="text-grey-light f5 font-bold">{spot.spot_type.name}</span>
                                    </div>}
                                    {spot.spot_accessibility && <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Accessibility</span>
                                        <span className="text-grey-light f5 font-bold">{spot.spot_accessibility.description}</span>
                                    </div>}
                                    {spot.privacy && <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Privacy</span>
                                        <span className="text-grey-light f5 font-bold">{spot.privacy}</span>
                                    </div>}
                                    <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Difficulty</span>
                                        <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden">
                                            <span className="bg-orange absolute t-0 l-0 h-full" style={{ width: difficultyProgression + '%' }}></span>
                                        </div>
                                    </div>
                                    <div className="flex align-center justify-between">
                                        <span className="text-grey f5 pr-4">Popularity</span>
                                        <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden">
                                            <span className="bg-pink-light absolute t-0 l-0 h-full" style={{ width: difficultyProgression + '%' }}></span>
                                        </div>
                                    </div>
                                    <i className="block bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full mb-2 mt-3"></i>
                                    <div className="w-full flex flex-col">
                                        <span className="text-grey f5 pr-4">Description</span>
                                        <textarea className="w-full common-input mt-2 mb-0 resize-0 outline-0 py-2 px-2 h-200px overflow-y-scroll" placeholder="Spot description" readOnly="readonly" value={spot.description} />
                                    </div>
                                </div>
                                <div className="bg-grey-dark-light mr-2 br-4 py-4 px-4 mt-4">
                                    <header className="w-full flex justify-start">
                                        <h3 className="text-yellow-dark f6 uppercase good-times font-normal mt-0">Spot location advisories</h3>
                                    </header>
                                    <div className="flex-1 bg-dark-3 br-5 relative">
                                        {spotAdvisories && <Advisories advisories={spotAdvisories.advisories} color={spotAdvisories.color} lng={spot.longitude} lat={spot.latitude} />}
                                    </div>
                                </div>

                            </div>
                            <div className="w-half bg-grey-dark-light ml-2 br-4 py-4 px-4">
                                <header className="w-full flex align-center justify-start">
                                    <h3 className="text-pink f6 uppercase good-times font-normal my-0">Spot wall</h3>
                                    <span className="text-grey f4 uppercase good-times font-normal my-0 ml-1"> - Coming soon</span>
                                </header>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails;