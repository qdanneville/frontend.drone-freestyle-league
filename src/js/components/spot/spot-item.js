import React from 'react'
import { Link } from "react-router-dom";

const SpotItem = ({ spot }) => {
    return (
        <Link to={`/spots/details/${spot.slug}`}>
            {spot.name}
        </Link>
    )
}

export default SpotItem