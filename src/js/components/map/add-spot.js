import React, { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl';

const AddSpot = ({ map, lng, lat, setMarkerCoords }) => {

    if (!map) return <></>

    const [draggableMarker, setDraggableMarker] = useState(null);
    const [addSpotActive, setAddSpotActive] = useState(false);
    const [markerLng, setMarkerLng] = useState(lng);
    const [markerLat, setMarkerLat] = useState(lat);

    useEffect(() => {
        setMarkerCoords({ lng, lat });
        if (draggableMarker) draggableMarker.on('dragend', onDragEnd)
    }, [draggableMarker])

    const onDragEnd = () => {
        var lngLat = draggableMarker.getLngLat();
        setMarkerLng(lngLat.lng);
        setMarkerLat(lngLat.lat);
        setMarkerCoords(lngLat);
    }

    const addDraggableMarker = () => {
        setAddSpotActive(true);

        const el = document.createElement('div');
        el.innerHTML = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z" stroke="#F9F133" stroke-width="0.75" stroke-miterlimit="10"/>
            <path d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z" stroke="#F9F133" stroke-width="2" stroke-miterlimit="10"/>
            <path opacity="0.5" d="M12.5 17.5C15.2614 17.5 17.5 15.2614 17.5 12.5C17.5 9.73858 15.2614 7.5 12.5 7.5C9.73858 7.5 7.5 9.73858 7.5 12.5C7.5 15.2614 9.73858 17.5 12.5 17.5Z" stroke="black" stroke-width="0.75" stroke-miterlimit="10"/>
            <path opacity="1" d="M12.5 14C13.3284 14 14 13.3284 14 12.5C14 11.6716 13.3284 11 12.5 11C11.6716 11 11 11.6716 11 12.5C11 13.3284 11.6716 14 12.5 14Z" fill="white"/>
            <path d="M13.8 5.99999H11.2L12.5 4.79999L13.8 5.99999Z" fill="#F9F133"/>
            <path d="M11.2 19H13.8L12.5 20.2L11.2 19Z" fill="#F9F133"/>
            <path d="M19 13.8V11.2L20.2 12.5L19 13.8Z" fill="#F9F133"/>
            <path d="M6.00005 11.2V13.8L4.80005 12.5L6.00005 11.2Z" fill="#F9F133"/>
            </svg>`;

        el.className = 'marker marker-draggable';

        const tooltip = document.createElement('div');
        tooltip.className = "tooltip drag-me"
        tooltip.innerHTML = `<span>Drag me !</span>`

        el.appendChild(tooltip);

        var marker = new mapboxgl.Marker(el, {
            draggable: true
        })
            .setLngLat([lng, lat])
            .addTo(map);

        setDraggableMarker(marker);
    }

    if (map && !draggableMarker) addDraggableMarker();

    return (
        <></>
    )
}

export default AddSpot;