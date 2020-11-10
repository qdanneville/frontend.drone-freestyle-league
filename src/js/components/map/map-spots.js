import React, { useState, useEffect } from 'react'
import { addPublicSpots, addPilotSpots } from '../../utils/mapbox'
import api from '../../utils/api'

const MapSpots = ({ map }) => {

    if (!map) return <></>

    const [publicSpots, setPublicSpots] = useState([])
    const [pilotSpots, setPilotSpots] = useState([])

    useEffect(() => {
        api.get('/spots/map')
            .then(response => {

                const publicSpotsFeatures = response.data.publicSpotsFeatures;
                const pilotSpotsFeatures = response.data.pilotSpotsFeatures;

                if (publicSpotsFeatures, pilotSpotsFeatures) {
                    addPublicSpots(publicSpotsFeatures, map)
                    setPublicSpots(publicSpotsFeatures)

                    addPilotSpots(pilotSpotsFeatures, map)
                    setPilotSpots(pilotSpotsFeatures)

                }
            })
    }, [])

    return <></>
}

export default MapSpots