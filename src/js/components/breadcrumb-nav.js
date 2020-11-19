import React, { useState } from 'react'
import {
    NavLink,
    useLocation,
    useRouteMatch
} from 'react-router-dom'

import RightIcon from '../../assets/svg/small-right.svg'

const BreadcrumbNav = ({ routes }) => {
    const location = useLocation()

    let breadCrumbs = []
    let slugUsed = false;

    routes.forEach(route => {
        let match = useRouteMatch(route.path)

        //'create' is considered as a slug, but 'create' is a path, i might want to do this differenlty, dunno
        if (match && match.params.slug === 'create') return
        if (match && match.params.slug && !slugUsed) {
            route.slug = match.params.slug
            slugUsed = true
        }
        if (match) route.url = match.url
        if (match !== null) breadCrumbs.push(route);
    })

    return (
        <nav className="breadcrumbs flex align-center l-0 t-3 bg-grey-black px-4 py-2 br-4">
            {
                breadCrumbs.map((route, i) => {
                    if (route.cantClick) return <span key={route.path} className={`text-grey lowercase flex align-center`}> {route.name}</span>
                    return <NavLink to={route.url} key={route.path} exact={route.exact} className={`text-grey lowercase flex align-center ${route.url === location.pathname ? 'text-white' : ''}`}>{<RightIcon className="w-4 h-4 fill-white mx-2" />}{route.slug ? route.slug : route.name}</NavLink>
                })
            }
        </nav>
    )
}

export default BreadcrumbNav