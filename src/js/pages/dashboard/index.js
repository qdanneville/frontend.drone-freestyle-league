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
            <div className="common-container mt-10">
                {/* <ul className="flex align-center justify-even common-tabs w-half w-full-md" style={{ transform: 'translate3d(0, -26px, 0)' }}>
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
                </ul> */}
                <div className="flex align-center justify-center text-align-center mb-10">
                    <p className="text-white font-normal w-half w-full-md f4 lh-4 br-6 p-4 bc-teal bs-solid bw-1"><strong>Hello fellow pilot, welcome to DFL V.0 !</strong><br /><br />
                    You are amongst the very few to have access to our platform.
                    We process step by step to bring DFL to the whole FPV community.
                    This DFL V.0 platform includes several features for you to discover,
                    you can give us your feedback on your experience with this version
                    so we can build the future of DFL together.
                    Thank you for participating, and happy (and safe) flying!
                    </p>
                </div>
                <Switch>
                    <Route path="/dashboard/activity/" render={() => <Activity />} />
                    <Route path="/dashboard/community/" render={() => <Community />} />
                    <Redirect path="/dashboard/" to="/dashboard/community/" />
                </Switch>
            </div>
        </section>
    )
}

export default Dashboard