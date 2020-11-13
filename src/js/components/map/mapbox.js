import React, { useRef, useState, useEffect } from 'react'
import config from '../../../../config'
import mapboxgl from 'mapbox-gl';

import AddSpot from './add-spot';
import MapSpots from './map-spots';
import Loader from '../loader'

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN

const Mapbox = (props) => {

    const mapContainerRef = useRef(null);
    // const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    //TODO get user location
    const [map, setMap] = useState(null);
    const [plugin, setPlugin] = useState(null);
    const [lng, setLng] = useState(2.5021)
    const [lat, setLat] = useState(46.6430)
    const [zoom, setZoom] = useState(5.54)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (window !== undefined && typeof window !== "undefined") {

            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/dark-v9?optimize=true',
                center: [lng, lat],
                zoom: zoom
            });

            setMap(map);

            const mapConfig = {
                "airmap": {
                    "api_key": config.AIRMAP_ACCESS_TOKEN
                },
                "auth0": {
                    "client_id": "",
                    "callback_url": ""
                },
                "mapbox": {
                    "access_token": config.MAPBOX_ACCESS_TOKEN
                }
            }

            const plugin = new window.AirMap.ContextualAirspacePlugin(mapConfig);
            map.addControl(plugin, 'top-left')

            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4));
                setLat(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
            });

            map.on('styledata', () => {
                //Adding a little delay in order to smoothly show the map
                //I might wanna change it later, dunno
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            })

            setPlugin(plugin);

            plugin.on('jurisdictionChange', (data) => console.log('jurisdictionChange', data))
            plugin.on('airspaceLayerClick', (data) => console.log('airspaceLayerClick', data))

            // Clean up on unmount
            return () => map.remove();
        }
    }, []);

    return (
        <div className="map-container">
            {loading && <Loader />}
            <div className='text-white absolute r-0 b-0 z-index-1 flex flex-col justify-end text-align-right p-2'>
                <span className="uppercase f4 font-bold italic">Cursor Location</span>
                <div className="uppercase f5 font-bold">
                    {lng},{lat}
                </div>
                <MapSpots map={map} />
                {props.addSpot && <AddSpot map={map} lng={lng} lat={lat} setMarkerCoords={props.setMarkerCoords} />}
            </div>
            <div className='absolute t-0 l-0 r-0 b-0' ref={mapContainerRef} />
        </div>
    );
}

export default Mapbox;

