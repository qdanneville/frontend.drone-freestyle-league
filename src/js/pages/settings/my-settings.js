import React from 'react';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import UserAccount from './account'
import UserPersonalInformation from './personal-informations'
import UserPrivacy from './privacy'
import BreadCrumbs from '../../components/breadcrumb-nav'

const routes = [
    {
        name: 'Settings',
        path: "/settings/",
        exact: true,
        dontShow: true,
    },
    {
        name: 'Account',
        path: "/settings/account/",
        exact: false,
    },
    {
        name: 'Personal information',
        path: "/settings/personal-information/",
        exact: true,
    },
    {
        name: 'Privacy',
        path: "/settings/privacy/",
        exact: false,
    },
]

const Settings = (props) => {

    const user = useSelector(state => state.auth.user)

    return (
        <div className="w-full relative">
            <header className="w-full pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2">
                <div className="flex align-center">
                    <BreadCrumbs routes={routes} />
                </div>
                <div className="flex flex-col w-full px-10 pt-10">
                    <div className="flex justify-between align-center mb-3">
                        <h1 className="text-grey-light good-times f2 mt-0 mb-0">User settings</h1>
                    </div>
                    <ul className="flex align-center justify-even common-tabs center-line">
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
                <Redirect exact path="/settings/" to="/settings/account/" />
                <Route path="/settings/account/" render={() => <UserAccount user={user} />} />
                <Route path="/settings/personal-information/" render={() => <UserPersonalInformation user={user} />} />
                <Route path="/settings/privacy/" component={UserPrivacy} />
            </Switch>
        </div>
    )
}

export default Settings;