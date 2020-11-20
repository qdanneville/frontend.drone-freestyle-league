import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

import Loading from '../../components/loader'
import SpotItemSquared from '../../components/spot/spot-item-squared'
import Loader from '../../components/loader'

const ProfileSpots = ({ profile }) => {


    const [spots, setSpots] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        api.get(`/spots/pilot?pilot=${profile.type.pilot_id}`)
            .then(response => setSpots(response.data))
            .finally(() => setIsLoading(false))
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