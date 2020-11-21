import React from 'react'
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import BreadCrumbs from '../../components/breadcrumb-nav'

import Activity from './activity/'
import Community from './community/'

const routes = [
    {
        name: 'dashboard',
        path: "/dashboard/",
        exact: true,
        dontShow: true,
        cantClick: true
    },
    {
        name: 'activity',
        path: "/dashboard/activity/",
        exact: false,
    },
    {
        name: 'My likes',
        path: "/dashboard/activity/my-likes",
        dontShow: true,
        exact: false,
    },
    {
        name: 'Following',
        path: "/dashboard/activity/following",
        dontShow: true,
        exact: false,
    },
    {
        name: 'community',
        path: "/dashboard/community/",
        exact: false,
    },
    {
        name: 'Followers',
        path: "/dashboard/community/followers",
        dontShow: true,
        exact: false,
    },
    {
        name: 'Following',
        path: "/dashboard/community/following",
        dontShow: true,
        exact: false,
    },
    {
        name: 'Search profile',
        path: "/dashboard/community/search-profile",
        dontShow: true,
        exact: false,
    },
]

const Dashboard = (props) => {

    return (
        <section className="w-full">
            <header className="w-full">
                <div className="flex align-center">
                    <BreadCrumbs routes={routes} />
                </div>
            </header>
            <div className="common-container mt-20">
                <ul className="flex align-center justify-even common-tabs w-half w-full-md" style={{ transform: 'translate3d(0, -26px, 0)' }}>
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
                <Switch>
                    <Route path="/dashboard/activity/" render={() => <Activity />} />
                    <Route path="/dashboard/community/" render={() => <Community />} />
                    <Redirect path="/dashboard/" to="/dashboard/activity/" />
                </Switch>
            </div>
        </section>
    )
}

export default Dashboard