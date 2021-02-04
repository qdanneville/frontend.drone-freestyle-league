import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

import Loader from '../../components/loader'
import GearSquareItem from '../../components/gear/gear-square-item'

const ProfileDrones = ({ profile }) => {

    let _isMounted = false;
    const [drones, setDrones] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        _isMounted = true;

        api.get(`/drones?creator.id=${profile.id}`)
            .then(response => _isMounted && setDrones(response.data))
            .finally(() => _isMounted && setIsLoading(false))

        return (() => {
            _isMounted = false;
        })
    }, [])

    if (isLoading) return <Loader className="relative" />

    return (
        <>
            <h3 className="text-grey f4 font-normal">Drones </h3>
            <ul className="flex w-full flex-wrap w-full">
                {
                    drones && drones.map(drone => <GearSquareItem fromProfile={true} key={drone.id} name={drone.name} type={'drones'} image={drone.image} slug={drone.slug} category={drone.type ? drone.type.name : ''} manufacturer={drone.manufacturer ? drone.manufacturer.name : ''} />)
                }
            </ul>
        </>
    )
}

export default ProfileDrones