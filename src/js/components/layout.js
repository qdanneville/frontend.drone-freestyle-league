import React from 'react'
import Header from './header'

const Layout = (props) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <main className="common-container">
                {props.children}
            </main>
        </div>
    )
}

export default Layout