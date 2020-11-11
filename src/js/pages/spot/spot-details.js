import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'

import Loader from '../../components/loader'
import BackButton from '../../components/back-button'

const SpotDetails = (props) => {

    const { slug } = useParams();
    const [spot, setSpot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`spots/${slug}`)
            .then(response => {
                if (response.data) setSpot(response.data)
                setIsLoading(false);
            })
    }, [])

    if (isLoading) return <Loader/>

    return (
        <div className="common-container pt-4">
            <header>
                <BackButton />
                <h1 className="text-yellow good-times f2">Spot : {spot.name}</h1>
            </header>
            <span>{spot.description}</span>
        </div>
    )
}

export default SpotDetails;