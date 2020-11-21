import React from 'react';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import Following from './following'
import Followers from './followers'
import SearchProfile from './search-profile'

const routes = [
    {
        name: 'My Followers',
        path: "/dashboard/community/followers",
        exact: false,
    },
    {
        name: 'My following',
        path: "/dashboard/community/following",
        exact: false,
    },
    {
        name: 'Search profile',
        path: "/dashboard/community/search-profile",
        exact: false,
    }
]

const Community = () => {
    return (
        <section className="w-full">
            <div className="common-container">
                <ul className="flex align-center justify-even common-tabs w-half w-full-md" style={{ transform: 'translate3d(0, -26px, 0)' }}>
                    {
                        routes.map((route, i) => {
                            return (
                                <NavLink to={route.path} key={route.path} className='common-tab flex-1 text-align-center'>
                                    <span className="py-3 block">{route.name}</span>
                                </NavLink>
                            )
                        })
                    }
                </ul>
                <Switch>
                    <Route path="/dashboard/community/followers" render={() => <Followers />} />
                    <Route path="/dashboard/community/following" render={() => <Following />} />
                    <Route path="/dashboard/community/search-profile" render={() => <SearchProfile />} />
                    <Redirect path="/dashboard/community/" to="/dashboard/community/followers/" />
                </Switch>
            </div>
        </section>
    );
};

export default Community;