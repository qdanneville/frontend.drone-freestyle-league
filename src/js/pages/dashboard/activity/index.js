import React from 'react';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import Following from './following'
import MyLikes from './my-likes'

const routes = [
    {
        name: 'My likes',
        path: "/dashboard/activity/my-likes",
        exact: false,
    },
    {
        name: 'Following',
        path: "/dashboard/activity/following",
        exact: false,
    },
]

const Activity = () => {
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
                    <Route path="/dashboard/activity/my-likes" render={() => <MyLikes />} />
                    <Route path="/dashboard/activity/following" render={() => <Following />} />
                    <Redirect path="/dashboard/activity/" to="/dashboard/activity/my-likes/" />
                </Switch>
            </div>
        </section>
    );
};

export default Activity;