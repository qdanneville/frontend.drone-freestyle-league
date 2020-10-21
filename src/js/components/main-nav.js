import React from 'react';
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearToken } from '../utils/local-storage';

import NavBlueBg from '../../assets/svg/nav-blue-bg.svg';
import NavOrangeBg from '../../assets/svg/nav-orange-bg.svg';
import NavPinkBg from '../../assets/svg/nav-pink-bg.svg';

import UserProfile from './user-profile';

import DflSvg from '../../assets/svg/dfl-logo.svg';

const MainNav = (props) => {
    return (
        <div className="main-nav py-10">
            <DflSvg />
            <UserProfile />
            <nav className="flex-1 flex flex-col justify-center items-center -ml-12">
                <li className="flex my-2 w-full">
                    <NavLink activeClassName="transform-translate-x-10" className="transition relative px-10 py-4 w-full text-align-center" to="/map">
                        <NavBlueBg className="absolute w-full h-full l-0 t-0" />
                        <span className="text-white good-times f4 text-shadow-2 px-10">Home</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full ml-6">
                    <NavLink activeClassName="transform-translate-x-10" className="transition relative px-10 py-4 w-full text-align-center" to="/profile">
                        <NavPinkBg className="absolute w-full h-full l-0 t-0" />
                        <span className="text-white good-times f4 text-shadow-2 px-10">Profile</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full ml-12">
                    <NavLink activeClassName="transform-translate-x-10" className="transition relative px-10 py-4 w-full text-align-center" to="/features">
                        <NavOrangeBg className="absolute w-full h-full l-0 t-0" />
                        <span className="text-white good-times f4 text-shadow-2 px-10">Features</span>
                    </NavLink>
                </li>
            </nav>
        </div>
    )
}

export default MainNav;