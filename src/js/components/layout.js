import React from 'react'
import Nav from './main-nav'

import { useSelector } from 'react-redux'

const Layout = (props) => {
    return (
        <div className="app-wrapper">
            <Nav />
            <main className="full-width-container">
                {props.children}
            </main>
        </div>
    )
}

export default Layout