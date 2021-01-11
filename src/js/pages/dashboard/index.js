import React from 'react'
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import BreadCrumbs from '../../components/breadcrumb-nav'

import Activity from './activity/'
import Publications from './publications'
import Drones from './drones'
import Spots from './spots'
import Gear from './gear'
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
            {/* <header className="w-full">
                <div className="flex align-center">
                    <BreadCrumbs routes={routes} />
                </div>
            </header> */}
            <div className="px-10 mt-10 flex">
                <aside className="flex flex-col bg-grey-dark-light br-6 p-4">
                    <Activity />
                    <Gear />
                    <Drones />
                    <Spots />
                </aside>
                <main className="flex flex-col mx-2">
                    <Publications />
                </main>
                <aside>
                    <Switch>
                        <Route path="/dashboard/community/" render={() => <Community />} />
                        <Redirect path="/dashboard/" to="/dashboard/community/" />
                    </Switch>
                </aside>
            </div>
        </section>
    )
}

export default Dashboard