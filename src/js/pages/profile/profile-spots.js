import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

import Loading from '../../components/loader'
import SpotItemSquared from '../../components/spot/spot-item-squared'
import Loader from '../../components/loader'

const ProfileSpots = ({ profile }) => {

    let _isMounted = false;
    const [spots, setSpots] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        _isMounted = true;

        api.get(`/spots/pilot?pilot=${profile.type.pilot_id}`)
            .then(response => _isMounted && setSpots(response.data))
            .finally(() => _isMounted && setIsLoading(false))

        return (() => {
            _isMounted = false;
        })
    }, [])

    if (isLoading) return <Loader className="relative" />

    return (
        <>
            <h3 className="text-grey f4 font-normal">Spot list</h3>
            <ul className="flex w-full flex-wrap">
                {
                    spots.map(spot => <SpotItemSquared key={spot.id} spot={spot} />)
                }
            </ul>
        </>
    )
}

export default ProfileSpots