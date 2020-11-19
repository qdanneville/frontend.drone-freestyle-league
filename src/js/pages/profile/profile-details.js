import React, { useState, useEffect } from 'react'
import { Switch, Route, NavLink, Redirect, useHistory, Link, useParams } from "react-router-dom";
import api from '../../utils/api'

import ProfileSpots from './profile-spots';
import ProfileDrones from './profile-drones';
import ProfilePublications from './profile-publications';
import ProfileInformations from './profile-informations';

import BreadCrumbs from '../../components/breadcrumb-nav'

const routes = [
    {
        name: 'profile',
        path: "/profile/",
        exact: true,
        dontShow: true,
        cantClick: true
    },
    {
        name: 'profile details',
        path: "/profile/:slug/",
        exact: false,
        dontShow: true,
    },
    {
        name: 'spots',
        path: "/profile/:slug/spots",
        exact: false,
        isSlug: true,
    },
    {
        name: 'drones',
        path: "/profile/:slug/drones",
        exact: false,
        isSlug: true,
    },
    {
        name: 'publication',
        path: "/profile/:slug/publications",
        exact: false,
        isSlug: true,
    }
]

const ProfileDetails = (props) => {

    const { slug } = useParams();
    const history = useHistory();

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`/profiles/slug/${slug}`)
            .then(response => {
                if (response.data) setProfile(response.data)
                setIsLoading(false);
            })
            .catch(err => history.push('/dashboard/'))
    }, [])

    console.log('PROFILE', profile);

    return (
        <section className="w-full">
            <header className="w-full">
                <div className="flex align-center">
                    <BreadCrumbs routes={routes} />
                </div>
                <ProfileInformations profile={profile} />
                {slug && <ul className="flex align-center justify-even common-tabs center-line">
                    {
                        routes.map((route, i) => {
                            if (route.dontShow) return
                            if (route.path.includes(':slug')) {
                                route.path = route.path.replace(':slug', slug)
                            }

                            return (
                                <NavLink to={route.path} key={route.path} className='common-tab flex-1 text-align-center'>
                                    <span className="py-3 block">{route.name}</span>
                                </NavLink>
                            )
                        })
                    }
                </ul>}
            </header>
            <Switch>
                <Route path="/profile/:slug/spots/" render={() => <ProfileSpots profile={profile} />} />
                <Route path="/profile/:slug/drones/" render={() => <ProfileDrones profile={profile} />} />
                <Route path="/profile/:slug/publications/" render={() => <ProfilePublications profile={profile} />} />
                <Redirect path="/profile/:slug/" to='/profile/:slug/spots/' />
            </Switch>
        </section>
    )
}

export default ProfileDetails