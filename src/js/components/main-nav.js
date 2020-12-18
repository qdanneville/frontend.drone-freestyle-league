import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, NavLink } from "react-router-dom";
import { clearToken, clearSettings, clearProfile } from '../utils/local-storage'
import { clearAuth } from '../utils/api'

import { setSettings, fetchSettings } from '../store/settings'

import UserProfile from './user-profile';

import DflSvg from '../../assets/svg/dfl-logo.svg';
import DashboardIcon from '../../assets/svg/dashboard.svg';
import MapIcon from '../../assets/svg/map.svg';
import MyFleetIcon from '../../assets/svg/my-fleet.svg';
import MySpotsIcon from '../../assets/svg/my-spots.svg';
import MyCommunityIcon from '../../assets/svg/my-community.svg';
import MyFormsIcon from '../../assets/svg/my-forms.svg';
import SettingsIcon from '../../assets/svg/settings.svg';
import LogoutIcon from '../../assets/svg/logout.svg';

const MainNav = (props) => {

    useEffect(() => {
        dispatch(fetchSettings());
    }, [])

    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);
    const navColor = useSelector(state => state.settings.navColor);
    const history = useHistory();

    const signout = () => {
        clearToken();
        clearProfile();

        dispatch({
            type: 'CLEAR_AUTH_USER'
        })

        dispatch({
            type: 'CLEAR_AUTH_TOKEN'
        })

        clearAuth();
        clearSettings();

        history.replace({ pathname: "/login" })
    }

    return (
        <div className={`main-nav py-10 ${navColor} sticky t-0 h-100-vh`}>
            <div className="flex justify-center align-center">
                <NavLink to="/dashboard/"><DflSvg className="logo"/></NavLink>
            </div>
            <UserProfile />
            <nav className="flex-1 flex flex-col align-start py-10 w-full px-2">
                <li className="flex my-1 w-full justify-start text-align-left">
                    <NavLink activeClassName="active text-white bg-grey-dark-light fill-dashboard" className="nav-link py-2 px-3 flex justify-start align-center relative w-full text-align-left text-grey-black-2" to="/dashboard/">
                        <DashboardIcon className="w-5 h-5 w-6-md h-6-md" />
                        <span className="f4 capitalize pl-3 display-none-md">dashboard</span>
                    </NavLink>
                </li>
                <li className="flex my-1 w-full justify-start text-align-left">
                    <NavLink activeClassName="active text-white bg-grey-dark-light fill-teal" className="nav-link py-2 px-3 flex justify-start align-center relative w-full text-align-left text-grey-black-2" to="/map/">
                        <MapIcon className="w-5 h-5 w-6-md h-6-md" />
                        <span className="f4 capitalize pl-3 display-none-md ">Map</span>
                    </NavLink>
                </li>
                <li className="flex my-1 w-full justify-start text-align-left">
                    <NavLink activeClassName="active text-white bg-grey-dark-light fill-yellow" className="nav-link py-2 px-3 flex justify-start align-center relative w-full text-align-left text-grey-black-2" to="/spots/">
                        <MySpotsIcon className="w-5 h-5 w-6-md h-6-md" />
                        <span className="f4 capitalize pl-3 display-none-md">my spots</span>
                    </NavLink>
                </li>
                <li className="flex my-1 w-full justify-start text-align-left">
                    <NavLink activeClassName="active text-white bg-grey-dark-light fill-green" className="nav-link py-2 px-3 flex justify-start align-center relative w-full text-align-left text-grey-black-2" to="/gear/">
                        <MyFleetIcon className="w-5 h-5 w-6-md h-6-md" />
                        <span className="f4 capitalize pl-3 display-none-md">my gear</span>
                    </NavLink>
                </li>
                <li className="flex my-1 w-full justify-start text-align-left">
                    <NavLink activeClassName="active text-white bg-grey-dark-light fill-white" className="nav-link py-2 px-3 flex justify-start align-center relative w-full text-align-left text-grey-black-2" to="/settings/">
                        <SettingsIcon className="w-5 h-5 w-6-md h-6-md" />
                        <span className="f4 capitalize pl-3 display-none-md">settings</span>
                    </NavLink>
                </li>
            </nav>
            <div className="flex justify-start align-center w-full px-5">
                <LogoutIcon /> <span className="underline f7 text-grey pl-2 cursor-pointer" onClick={signout}>Log out</span>
            </div>
        </div>
    )
}

export default MainNav;