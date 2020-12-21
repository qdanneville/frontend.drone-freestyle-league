import React from 'react';
import {
    Switch,
    Route,
    NavLink,
    Redirect,
    useHistory
} from "react-router-dom";

import BreadCrumbs from '../../components/breadcrumb-nav'

import GearAll from './gear-all'
import GearAccessories from './gear-accessories'
import GearAccessoryEdit from './gear-accessory-edit'
import GearDrones from './gear-drones'
import GearDroneEdit from './gear-drone-edit'
import GearDroneDetails from './gear-drone-details'
import GearBatteries from './gear-batteries'
import GearBatteryEdit from './gear-battery-edit'
import BackButton from '../../components/back-button';

const routes = [
    {
        name: 'my gear',
        path: "/gear/",
        dontShow: true,
        exact: true,
    },
    {
        name: 'all',
        path: "/gear/all/",
        exact: true,
    },
    {
        name: 'Accessories',
        path: "/gear/accessories/",
        exact: true,
    },
    {
        name: 'Accessory details',
        path: "/gear/accessories/:slug/",
        exact: false,
        dontShow: true,
        preventClick: true,
    },
    {
        name: 'edit',
        path: "/gear/accessories/:slug/edit",
        exact: false,
        dontShow: true,
    },
    {
        name: 'create',
        path: "/gear/accessories/create",
        exact: false,
        dontShow: true,
    },
    {
        name: 'Drones',
        path: "/gear/drones/",
        exact: true,
    },
    {
        name: 'Drone details',
        path: "/gear/drones/:slug/",
        exact: false,
        dontShow: true,
    },
    {
        name: 'edit',
        path: "/gear/drones/:slug/edit",
        exact: false,
        dontShow: true,
    },
    {
        name: 'create',
        path: "/gear/drones/create",
        exact: false,
        dontShow: true,
    },
    {
        name: 'Batteries',
        path: "/gear/batteries/",
        exact: true,
    },
    {
        name: 'Batteries details',
        path: "/gear/batteries/:slug/",
        exact: false,
        dontShow: true,
        preventClick: true,
    },
    {
        name: 'edit',
        path: "/gear/batteries/:slug/edit",
        exact: false,
        dontShow: true,
    },
    {
        name: 'create',
        path: "/gear/batteries/create",
        exact: false,
        dontShow: true,
    },
]

const MyGear = (props) => {

    const history = useHistory();

    console.log(history.location);

    //Hiding the nav within a drone public page
    let isDronePublicPage = history.location.pathname !== "/gear/drones/" && history.location.pathname.includes('/gear/drones/') && !history.location.pathname.includes('edit')

    return (
        <div className="w-full relative">
            { !isDronePublicPage && <header className="relative w-full pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 mb-5">
                <div className="flex align-center">
                    <BreadCrumbs routes={routes} />
                </div>
                <div className="absolute h-full t-6 l-8 flex align-center mt-7-md ml-2-md">
                    <BackButton />
                </div>
                <div className="flex flex-col w-full px-10 mb-5 mt-5-md mb-10-md">
                    <ul className="flex align-center justify-even common-tabs w-half w-full-md">
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
            </header>}
            <Switch>
                <Route exact path="/gear/accessories/" component={GearAccessories} />
                <Route path="/gear/accessories/create" component={() => <GearAccessoryEdit create />} />
                <Route path="/gear/accessories/:slug/edit" component={() => <GearAccessoryEdit edit />} />

                <Route exact path="/gear/drones/" component={GearDrones} />
                <Route path="/gear/drones/create" component={() => <GearDroneEdit create />} />
                <Route exact path="/gear/drones/:slug/" component={() => <GearDroneDetails />} />
                <Route path="/gear/drones/:slug/edit" component={() => <GearDroneEdit edit />} />

                <Route exact path="/gear/batteries/" component={GearBatteries} />
                <Route path="/gear/batteries/create" component={() => <GearBatteryEdit create />} />
                <Route path="/gear/batteries/:slug/edit" component={() => <GearBatteryEdit edit />} />

                <Route path="/gear/all/" component={GearAll} />
                <Redirect exact path="/gear/" to="/gear/all/" />
            </Switch>
        </div>
    )
}

export default MyGear;