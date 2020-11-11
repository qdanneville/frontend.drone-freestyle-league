import React, { useEffect } from 'react'
import { addPublicSpots, addPilotSpots } from '../../utils/mapbox'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/api'

const MapSpots = ({ map }) => {

    if (!map) return <></>

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PUBLIC_SPOTS' })
        dispatch({ type: 'FETCH_PILOT_SPOTS' })

        api.get('/spots/map')
            .then(response => {

                const publicSpotsFeatures = response.data.publicSpotsFeatures;
                const pilotSpotsFeatures = response.data.pilotSpotsFeatures;

                if (publicSpotsFeatures, pilotSpotsFeatures) {
                    dispatch({ type: 'SET_PUBLIC_SPOTS', payload: publicSpotsFeatures })
                    addPublicSpots(publicSpotsFeatures, map)

                    dispatch({ type: 'SET_PILOT_SPOTS', payload: pilotSpotsFeatures })
                    addPilotSpots(pilotSpotsFeatures, map)
                }
            })
    }, [])

    return <></>
}

export default MapSpots