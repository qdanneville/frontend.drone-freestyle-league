import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import PublicMarkerIcon from '../../../assets/svg/public-marker.svg';
import PrivateMarkerIcon from '../../../assets/svg/private-marker.svg';
import FriendMarkerIcon from '../../../assets/svg/friend-marker.svg';

const MapFilters = ({ map }) => {

    if (!map) return <></>

    const currentMarkers = useSelector(state => state.map.markers);

    const [publicMarkers, setPublicMarkers] = useState([])
    const [privateMarkers, setPrivateMarkers] = useState([])
    const [friendsMarkers, setFriendsMarkers] = useState([])

    const [publicFilter, setPublicFilter] = useState(true)
    const [friendFilter, setFriendFilter] = useState(true)
    const [privateFilter, setPrivateFilter] = useState(true)

    //Filter markers
    useEffect(() => {

        publicFilter ? publicMarkers.map(marker => marker.addTo(map)) : publicMarkers.map(marker => marker.remove())
        friendFilter ? friendsMarkers.map(marker => marker.addTo(map)) : friendsMarkers.map(marker => marker.remove())
        privateFilter ? privateMarkers.map(marker => marker.addTo(map)) : privateMarkers.map(marker => marker.remove())

    }, [publicFilter, friendFilter, privateFilter])

    useEffect(() => {
        if (currentMarkers) {

            let publicsM = []
            let privatesM = []
            let friendsM = []

            currentMarkers.forEach(marker => {
                switch (marker.type) {
                    case 'public':
                        return publicsM.push(marker);
                    case 'private':
                        return privatesM.push(marker);
                    case 'friend':
                        return friendsM.push(marker);
                    default:
                        return
                }
            });

            setPublicMarkers(publicsM)
            setPrivateMarkers(privatesM)
            setFriendsMarkers(friendsM)
        }
    }, [currentMarkers])

    const handleFilter = (e) => {
        switch (e.target.name) {
            case 'public':
                return setPublicFilter(!publicFilter);
            case 'friend':
                return setFriendFilter(!friendFilter);
            case 'private':
                return setPrivateFilter(!privateFilter);
            default:
                return
        }
    }

    return (
        <div className="bg-dark br-6 shadow-7" style={{ width: '200px' }}>
            <span className="block text-grey f4 font-normal pt-2 px-2">Layers selection</span>
            <i className="my-2 block bb-w-2 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full"></i>
            <ul className="w-full">
                <li className="flex align-center justify-between py-2 px-2 -mr-2">
                    <div className="flex align-center">
                        <PublicMarkerIcon />
                        <span className="ml-2 text-grey-black-2 f5 font-normal">Public spots</span>
                    </div>
                    <label className="checkbox-default inline-flex items-center -mt-2 ml-2">
                        <input checked={publicFilter} type="checkbox" name="public" onChange={handleFilter} />
                        <span className="checkmark"></span>
                    </label>
                </li>
                <li className="flex align-center justify-between py-2 px-2 -mr-2">
                    <div className="flex align-center">
                        <FriendMarkerIcon />
                        <span className="ml-2 text-grey-black-2 f5 font-normal">Followed spots</span>
                    </div>
                    <label className="checkbox-default inline-flex items-center -mt-2 ml-2">
                        <input checked={friendFilter} type="checkbox" name="friend" onChange={handleFilter} />
                        <span className="checkmark"></span>
                    </label>
                </li>
                <li className="flex align-center justify-between py-2 px-2 -mr-2">
                    <div className="flex align-center">
                        <PrivateMarkerIcon />
                        <span className="ml-2 text-grey-black-2 f5 font-normal">Private spots</span>
                    </div>
                    <label className="checkbox-default inline-flex items-center -mt-2 ml-2">
                        <input checked={privateFilter} type="checkbox" name="private" onChange={handleFilter} />
                        <span className="checkmark"></span>
                    </label>
                </li>
            </ul>
        </div>
    )
}

export default MapFilters