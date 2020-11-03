import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";

import { setSettings, fetchSettings } from '../store/settings'

import NavBlueBg from '../../assets/svg/nav-blue-bg.svg';
import NavOrangeBg from '../../assets/svg/nav-orange-bg.svg';
import NavPinkBg from '../../assets/svg/nav-pink-bg.svg';

import UserProfile from './user-profile';

import DflSvg from '../../assets/svg/dfl-logo.svg';

const MainNav = (props) => {

    useEffect(() => {
        dispatch(fetchSettings());
    }, [])

    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);
    const navColor = useSelector(state => state.settings.navColor);

    return (
        <div className={`main-nav py-10 ${navColor}`}>
            <DflSvg />
            <UserProfile />
            <nav className="flex-1 flex flex-col justify-center align-start">
                <li className="flex my-2 w-full">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white" className="transition relative px-10 w-full text-align-center" to="/map">
                        <span className="good-times f4 text-shadow-2 px-10">Home</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-pink' }))} activeClassName="text-white" className="transition relative px-10 w-full text-align-center" to="/profile">
                        <span className="good-times f4 text-shadow-2 px-10">Profile</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-orange' }))} activeClassName="text-white" className="transition relative px-10 w-full text-align-center" to="/features">
                        <span className="good-times f4 text-shadow-2 px-10">Features</span>
                    </NavLink>
                </li>
            </nav>
        </div>
    )
}

export default MainNav;