import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, NavLink } from "react-router-dom";
import { clearToken, clearSettings } from '../utils/local-storage'
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
        <div className={`main-nav py-10 pl-9 pr-15 ${navColor}`}>
            <div className="flex justify-center align-center">
                <DflSvg />
                <div className="flex flex-col pl-6 -mt-2">
                    <span className="f5 good-times italic uppercase text-white font-black">Drone</span>
                    <span className="f5 good-times italic uppercase text-white font-black -ml-2">Freestyle</span>
                    <span className="f5 good-times italic uppercase text-white font-black -ml-4">League</span>
                </div>
            </div>
            <UserProfile />
            <nav className="flex-1 flex flex-col align-start py-10 w-full">
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-dashboard' }))} activeClassName="text-white fill-dashboard" className="flex justify-start align-center relative w-full text-align-left" to="/dashboard">
                        <DashboardIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">dashboard</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-teal' }))} activeClassName="text-white fill-teal" className="flex justify-start align-center relative w-full text-align-left" to="/map">
                        <MapIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">Map</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-green' }))} activeClassName="text-white fill-green" className="flex justify-start align-center relative w-full text-align-left" to="/myfleet">
                        <MyFleetIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my fleet</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-yellow' }))} activeClassName="text-white fill-yellow" className="flex justify-start align-center relative w-full text-align-left" to="/myspots">
                        <MySpotsIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my spots</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-orange' }))} activeClassName="text-white fill-orange" className="flex justify-start align-center relative w-full text-align-left" to="/mycommunity">
                        <MyCommunityIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my community</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-pink' }))} activeClassName="text-white stroke-pink" className="flex justify-start align-center relative w-full text-align-left" to="/myforms">
                        <MyFormsIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my forms</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-white' }))} activeClassName="text-white fill-white" className="flex justify-start align-center relative w-full text-align-left" to="/settings">
                        <SettingsIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">settings</span>
                    </NavLink>
                </li>
            </nav>
            <div className="flex justify-start align-center w-full">
                <LogoutIcon /> <span className="underline f7 text-grey pl-2 cursor-pointer" onClick={signout}>Log out</span>
            </div>
        </div>
    )
}

export default MainNav;