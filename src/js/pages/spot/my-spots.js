import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import SpotEdit from './spot-edit'
import SpotDetails from './spot-details'
import SpotList from './spot-list'
import BreadCrumbs from '../../components/breadcrumb-nav'

const routes = [
    {
        name: 'my spots',
        path: "/spots",
        exact:true,
    },

    {
        name: 'spot details',
        path: "/spots/:slug/",
        exact:false,
    },
    {
        name: 'spot edit',
        path: "/spots/:slug/edit",
        exact:false,
    },
    {
        name: 'spot create',
        path: "/spots/create",
        exact:false,
    },
]

const MySpots = (props) => {

    console.log('updated my spots')
    return (
        <div className="w-full pt-17 relative">
            <BreadCrumbs routes={routes} />
            <Switch>
                <Route exact path="/spots/" component={SpotList} />
                <Route path="/spots/create/" component={SpotEdit} />
                <Route path="/spots/:slug/edit" component={SpotEdit} />
                <Route path="/spots/:slug/" component={SpotDetails} />
            </Switch>
        </div>
    )
}

export default MySpots;