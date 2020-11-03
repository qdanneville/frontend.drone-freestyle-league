import React, { useRef, useState, useEffect } from 'react'
import config from '../../../config'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN

const DflMap = (props) => {

    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(2.5021)
    const [lat, setLat] = useState(46.6430)
    const [zoom, setZoom] = useState(5.54)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [lng, lat],
            zoom: zoom
        });

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

        plugin.on('jurisdictionChange', (data) => console.log('jurisdictionChange', data))
        plugin.on('airspaceLayerClick', (data) => console.log('airspaceLayerClick', data))

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return (
        <div className="map-container">
            <div className='text-white absolute r-0 b-0 bg-dark z-index-1 flex'>
                <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
            <div className='absolute t-0 l-0 r-0 b-0' ref={mapContainerRef} />
        </div>
    );
}
export default DflMap;
