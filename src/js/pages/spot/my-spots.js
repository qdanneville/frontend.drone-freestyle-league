import React from 'react';
import {
    Route,
    Link
} from "react-router-dom";

import SpotEdit from './spot-edit'

const MySpots = (props) => {
    return (
        <div className="common-container">
            <Link to="/myspots/create">Create a spot</Link>
            <Route path="/myspots/create" component={SpotEdit} />
        </div>
    )
}

export default MySpots;