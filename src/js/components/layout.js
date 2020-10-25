import React from 'react'
import Nav from './main-nav'

import { useSelector } from 'react-redux'

const Layout = (props) => {

    const user = useSelector(state => state.auth.user)
    
    return (
        <div className="app-wrapper">
            <Nav />
            <main className="common-container">
                {props.children}
            </main>
        </div>
    )
}

export default Layout