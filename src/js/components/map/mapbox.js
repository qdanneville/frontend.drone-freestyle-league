import React, { useRef, useState, useEffect } from 'react'
import config from '../../../../config'
import mapboxgl from 'mapbox-gl';
import spotsData from '../../../../data/features.json';

import AddSpot from './add-spot';

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN

const Mapbox = (props) => {

    const mapContainerRef = useRef(null);

    const [map, setMap] = useState(null);
    const [plugin, setPlugin] = useState(null);
    const [draggableMarker, setDraggableMarker] = useState(null);
    const [lng, setLng] = useState(2.5021)
    const [lat, setLat] = useState(46.6430)
    const [zoom, setZoom] = useState(5.54)
    const [spots, setSpots] = useState(spotsData);

    useEffect(() => {

        if (window !== undefined && typeof window !== "undefined") {

            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/dark-v9',
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

            //Creating an unique id for each spot
            spots.features.forEach((spot, i) => {
                spot.properties.id = i;
            })

            map.on('load', e => {
                map.addSource('places', {
                    type: 'geojson',
                    data: spots,
                });

                addMarkers(spots, map);
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
            <div className='text-white absolute r-0 b-0 z-index-1 flex flex-col justify-end text-align-right p-2'>
                <span className="uppercase f4 font-bold italic">Cursor Location</span>
                <div className="uppercase f5 font-bold">
                    {lng},{lat}
                </div>
                {props.addSpot && <AddSpot map={map} lng={lng} lat={lat} setMarkerCoords={props.setMarkerCoords} />}
            </div>
            <div className='absolute t-0 l-0 r-0 b-0' ref={mapContainerRef} />
        </div>
    );
}


const addMarkers = (markers, map) => {
    markers.features.forEach(marker => {
        const el = document.createElement('div');
        el.innerHTML = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z" stroke="#909090" stroke-width="0.75" stroke-miterlimit="10"/>
        <path d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z" stroke="#2DFFFE" stroke-miterlimit="10"/>
        <path opacity="0.5" d="M12.5 17.5C15.2614 17.5 17.5 15.2614 17.5 12.5C17.5 9.73858 15.2614 7.5 12.5 7.5C9.73858 7.5 7.5 9.73858 7.5 12.5C7.5 15.2614 9.73858 17.5 12.5 17.5Z" stroke="#909090" stroke-width="0.75" stroke-miterlimit="10"/>
        <path opacity="0.5" d="M12.5 14C13.3284 14 14 13.3284 14 12.5C14 11.6716 13.3284 11 12.5 11C11.6716 11 11 11.6716 11 12.5C11 13.3284 11.6716 14 12.5 14Z" fill="white"/>
        <path d="M13.8 5.99999H11.2L12.5 4.79999L13.8 5.99999Z" fill="#2DFFFE"/>
        <path d="M11.2 19H13.8L12.5 20.2L11.2 19Z" fill="#2DFFFE"/>
        <path d="M19 13.8V11.2L20.2 12.5L19 13.8Z" fill="#2DFFFE"/>
        <path d="M6.00005 11.2V13.8L4.80005 12.5L6.00005 11.2Z" fill="#2DFFFE"/>
        </svg>`;

        el.id = 'marker-' + marker.properties.id;
        el.className = 'marker';

        new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);


        el.addEventListener('click', (e) => {
            flyToSpot(marker, map)
            createPopUp(marker, map)
            e.stopPropagation();
        })
    })
}

const flyToSpot = (currentFeature, map) => {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 7
    });
}

const createPopUp = (currentFeature, map) => {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();

    console.log(currentFeature.properties.title)

    const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
            '<h3>' + currentFeature.properties.title + '</h3>' +
            '<h4>' +
            currentFeature.properties.description +
            '</h4>'
        )
        .addTo(map);
}

export default Mapbox;

