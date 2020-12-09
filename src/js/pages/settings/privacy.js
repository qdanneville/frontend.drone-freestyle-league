import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const UserPrivacy = (props) => {

    return <div className="w-full">
        <section className="common-container flex flex-col">
            <div className="flex w-full justify-between align-center my-6">
                <h4 className="f3 text-white font-bold my-0">Privacy</h4>
            </div>
            <div>
                <NavLink className="block underline f4 text-white" to="/terms-of-use">Terms of use</NavLink>
            </div>
        </section>
    </div>
}

export default UserPrivacy