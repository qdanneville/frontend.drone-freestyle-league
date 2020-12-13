import React from 'react';
import {
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";

import BreadCrumbs from '../../components/breadcrumb-nav'

import GearAll from './gear-all'
import GearAccessories from './gear-accessories'
import GearAccessoryEdit from './gear-accessory-edit'
import GearDrones from './gear-drones'
import GearBatteries from './gear-batteries'
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
        preventClick:true,
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
        name: 'Batteries',
        path: "/gear/batteries/",
        exact: true,
    }
]

const MyGear = (props) => {

    return (
        <div className="w-full relative">
            <header className="w-full pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 mb-10">
                <div className="flex align-center">
                    <BreadCrumbs routes={routes} />
                </div>
                <div className="flex flex-col w-full px-10 pt-10">
                    <div className="flex justify-between align-center mb-3">
                        <h1 className="text-green good-times f2 mt-0 mb-0">My gear</h1>
                        <BackButton />
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
                <Route exact path="/gear/accessories/" component={GearAccessories} />
                <Route path="/gear/accessories/create" component={() => <GearAccessoryEdit create />} />
                <Route path="/gear/accessories/:slug/edit" render={() => <GearAccessoryEdit edit />} />
                <Route path="/gear/drones/" component={GearDrones} />
                <Route path="/gear/batteries/" component={GearBatteries} />
                <Route path="/gear/all/" component={GearAll} />
                <Redirect exact path="/gear/" to="/gear/all/" />
            </Switch>
        </div>
    )
}

export default MyGear;