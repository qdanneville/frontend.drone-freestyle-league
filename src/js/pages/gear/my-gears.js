import React from 'react';
import {
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";

import BreadCrumbs from '../../components/breadcrumb-nav'

import GearDispatch from './gear-dispatch'
import GearPilot from './gear-pilot'
import GearDrones from './gear-drones'
import GearBatteries from './gear-batteries'

const routes = [
    {
        name: 'my gears',
        path: "/gears/",
        dontShow: true,
        exact: true,
    },
    {
        name: 'all',
        path: "/gears/all/",
        exact: true,
    },
    {
        name: 'Pilot gear',
        path: "/gears/pilot-gear/",
        exact: true,
    },
    {
        name: 'Drones',
        path: "/gears/drones/",
        exact: true,
    },
    {
        name: 'Batteries',
        path: "/gears/batteries/",
        exact: true,
    }
]

const MyGears = (props) => {

    return (
        <div className="w-full relative">
            <header className="w-full pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 mb-10">
                <div className="flex align-center">
                    <BreadCrumbs routes={routes} />
                </div>
                <div className="flex flex-col w-full px-10 pt-10">
                    <div className="flex justify-between align-center mb-3">
                        <h1 className="text-green good-times f2 mt-0 mb-0">My gears</h1>
                    </div>
                    <ul className="flex align-center justify-even common-tabs center-line w-half w-full-md">
                        {
                            routes.map((route, i) => {
                                if (route.dontShow) return
                                return (
                                    <NavLink to={route.path} key={route.path} className='common-tab flex-1 text-align-center'>
                                        <span className="py-3 block">{route.name}</span>
                                    </NavLink>
                                )
                            })
                        }
                    </ul>
                </div>
            </header>
            <Switch>
                <Route path="/gears/pilot-gear/" component={GearPilot} />
                <Route path="/gears/drones/" component={GearDrones} />
                <Route path="/gears/batteries/" component={GearBatteries} />
                <Route path="/gears/all/" component={GearDispatch} />
                <Redirect exact path="/gears/" to="/gears/all/" />
            </Switch>
        </div>
    )
}

export default MyGears;