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
        exact: true,
    },
    {
        name: 'spot details',
        path: "/spots/:slug/",
        exact: false,
    },
    {
        name: 'edit',
        path: "/spots/:slug/edit",
        exact: false,
    },
    {
        name: 'create',
        path: "/spots/create",
        exact: false,
    },
]

const MySpots = (props) => {

    return (
        <div className="w-full relative">
            <header className="flex align-center sticky t-0 w-full bg-dark z-index-8">
                <BreadCrumbs routes={routes} />
            </header>
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