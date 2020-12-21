import React, { useState, useEffect } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import api from '../../utils/api'
import config from '../../../../config'

import Loader from '../../components/loader'
import EditIcon from '../../../assets/svg/edit.svg';

import SpotUserInteraction from '../../components/spot/spot-user-interaction'
import GearSquareItem from '../../components/gear/gear-square-item'

const DroneDetails = (props) => {

    let _isMounted = false;

    const { slug } = useParams();
    const history = useHistory();

    const [drone, setDrone] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        _isMounted = true;
        api.get(`drones/${slug}`)
            .then(response => {
                if (response.data && _isMounted) setDrone(response.data)
                if (_isMounted) setIsLoading(false);
            })
            .catch(err => _isMounted && history.push('/gear/drones/'))

        return (() => {
            _isMounted = false;
        })
    }, [])

    console.log(drone);

    const profileCreationDate = drone && drone.creator ? new Date(drone.creator.created_at).toLocaleDateString('en-US') : null
    let difficultyProgression = drone && (drone.rating / 100) * 100;

    if (isLoading) return <Loader className="relative" />

    return (
        <div className="w-full">
            <div>
                {/* <header className="flex flex-col w-full px-10 pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full sticky t-0 z-index-7 bg-dark pt-10">
                    <div className="flex justify-between align-center mb-3 w-full">
                        <BackButton />
                        {drone.canEdit && <Link to={`/gear/drones/${drone.slug}/edit/`} className="text-dark fill-dark f4 flex justify-center align-center bg-grey-light hover:bg-grey py-2 px-4 br-4 cursor-pointer"> <EditIcon className="stroke-15 w-4 h-4 mr-3" />Edit spot</Link>}
                    </div>
                </header> */}
                <div className="flex common-container pt-8">
                    <div className="flex flex-col align-center w-full">
                        <div className="relative spot-image flex justify-center align-start w-full br-10 box-shadow-1 overflow-hidden background-image block" style={drone && drone.image && { backgroundImage: `url(${config.API_BASE_URL + drone.image.url})` }}>
                            <SpotUserInteraction spotId={drone.id} className="absolute b-1 r-1" />
                        </div>
                        <div className="spot-profile z-index-1 flex flex-col justify-center align-center text-align-center py-4 px-10 bg-dark br-10">
                            {drone.creator ?
                                <div className="flex flex-col align-center">
                                    <i className="w-20 h-20 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${drone.creator.avatar && (config.API_BASE_URL + drone.creator.avatar.url)})` }}></i>
                                </div>
                                :
                                <div className="flex">
                                    <i className="w-20 h-20 br-50 bg-grey shadow-1 overflow-hidden bs-solid bc-white bw-2">
                                    </i>
                                </div>
                            }
                            {drone && drone.creator && <div className="flex flex-col align-center mt-2">
                                <span className="text-grey f2 uppercase mb-2"><strong className="text-white font-bold">{drone.creator ? drone.creator.display_name : 'Unknown'}</strong></span>
                                <span className="text-grey f4 uppercase mb-4 lowercase">@{drone.creator.slug}</span>
                                <span className="text-grey f4 my-1">Member since  <strong className="text-white font-bold">{profileCreationDate ? profileCreationDate : 'Unknown'}</strong></span>
                                {drone && drone.creator && drone.creator.slug && <Link to={`/profile/${drone.creator.slug}`} className="underline f5 font-bold text-teal-dark cursor-pointer mt-2">See profile</Link>}
                            </div>}
                        </div>
                        <div className="flex w-full">
                            <div className="flex flex-col w-half">
                                <div className="flex-flex-col bg-grey-dark-light mr-2 br-4 py-4 px-4">
                                    <header className="w-full flex justify-start">
                                        <h3 className="text-orange f6 uppercase good-times font-normal mt-0">Drone informations</h3>
                                    </header>
                                    {drone.name && <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Name</span>
                                        <span className="text-grey-light f5 font-bold">{drone.name}</span>
                                    </div>}
                                    {drone.type && drone.type.name && <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Type</span>
                                        <span className="text-grey-light f5 font-bold">{drone.type.name}</span>
                                    </div>}
                                    {drone.weight && <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Weight</span>
                                        <span className="text-grey-light f5 font-bold">{drone.weight}</span>
                                    </div>}
                                    {drone.preffered_frequency && <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Prefered Frequency</span>
                                        <span className="text-grey-light f5 font-bold">{drone.preffered_frequency.name}</span>
                                    </div>}
                                    <div className="flex align-center justify-between mb-1">
                                        <span className="text-grey f5 pr-4">Creator's rating</span>
                                        <div className="bg-grey-dark width-90-px h-3 relative br-50 overflow-hidden">
                                            <span className="bg-green absolute t-0 l-0 h-full" style={{ width: difficultyProgression + '%' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-half flex">
                                <div className="w-full h-full flex flex-col bg-grey-dark-light mr-2 br-4 py-4 px-4">
                                    <header className="w-full flex justify-start">
                                        <h3 className="text-orange f6 uppercase good-times font-normal mt-0 mb-0">Drone description</h3>
                                    </header>
                                    <textarea className="w-full common-input bg-transparent bw-0 mt-2 ml-0 pl-0 mb-0 resize-0 outline-0 h-full overflow-y-scroll" placeholder="Drone description" readOnly="readonly" value={drone.description} />
                                </div>
                            </div>
                        </div>
                        <i className="bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full my-4"></i>
                        <div className="flex w-full">
                            <div className="flex-1 w-33-per">
                                <div className="flex flex-col bg-grey-dark-light mr-2 br-4 py-4 px-4">
                                    <h3 className="text-green f6 uppercase good-times font-normal mt-0">Drone batteries</h3>
                                    {drone.batteries && drone.batteries.map(battery => <GearSquareItem key={battery.id} name={battery.name} infos={[battery.nb_cells && { name: battery.nb_cells, type: 'nb cells' }, battery.C && { name: battery.C, type: 'C' }, , battery.mAh && { name: battery.mAh, type: 'mAh' }]} type={'batteries'} image={battery.image} category={battery.battery_type ? battery.battery_type.name : ''} manufacturer={battery.manufacturer ? battery.manufacturer.name : ''} vendorLink={battery.vendor_link} dronePublicPage={true} />)}
                                </div>
                            </div>
                            <div className="flex-1 w-33-per">
                                <div className="flex flex-col bg-grey-dark-light mr-2 br-4 py-4 px-4">
                                    <h3 className="text-pink f6 uppercase good-times font-normal mt-0">Drone publications</h3>
                                </div>
                            </div>
                            <div className="flex-1 w-33-per">
                                <div className="flex flex-col bg-grey-dark-light mr-2 br-4 py-4 px-4">
                                    <h3 className="text-green f6 uppercase good-times font-normal mt-0">Drone components</h3>
                                    {drone.drone_parts && drone.drone_parts.map(part => <GearSquareItem key={part.id} name={part.name} infos={[part.price && { name: part.price, type: '€' }]} type={'accessories'} image={part.image} category={part.drone_parts_type ? part.drone_parts_type.name : ''} manufacturer={part.manufacturer ? part.manufacturer.name : ''} vendorLink={part.vendor_link} dronePublicPage={true} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DroneDetails;