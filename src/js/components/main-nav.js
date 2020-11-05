import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";

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
import Dashboard from '../pages/dashboard';

const MainNav = (props) => {

    useEffect(() => {
        dispatch(fetchSettings());
    }, [])

    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);
    const navColor = useSelector(state => state.settings.navColor);

    return (
        <div className={`main-nav py-10 px-10 ${navColor}`}>
            <DflSvg />
            <UserProfile />
            <nav className="flex-1 flex flex-col align-start py-10">
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white transition svg-transition fill-dashboard" className="flex justify-start align-center transition relative w-full text-align-left" to="/dashboard">
                        <DashboardIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">dashboard</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white transition svg-transition fill-teal" className="flex justify-start align-center transition relative w-full text-align-left" to="/map">
                        <MapIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">Map</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white transition svg-transition fill-yellow" className="flex justify-start align-center transition relative w-full text-align-left" to="/myfleet">
                        <MyFleetIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my fleet</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white transition svg-transition fill-green" className="flex justify-start align-center transition relative w-full text-align-left" to="/myspots">
                        <MySpotsIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my spots</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white transition svg-transition fill-orange" className="flex justify-start align-center transition relative w-full text-align-left" to="/mycommunity">
                        <MyCommunityIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my community</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white transition svg-transition stroke-pink" className="flex justify-start align-center transition relative w-full text-align-left" to="/myforms">
                        <MyFormsIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">my forms</span>
                    </NavLink>
                </li>
                <li className="flex my-2 w-full justify-start text-align-left">
                    <NavLink onClick={() => dispatch(setSettings({ ...settings, navColor: 'nav-blue' }))} activeClassName="text-white transition svg-transition fill-white" className="flex justify-start align-center transition relative w-full text-align-left" to="/settings">
                        <SettingsIcon className="w-6 h-6" />
                        <span className="f4 capitalize pl-3">settings</span>
                    </NavLink>
                </li>
            </nav>
        </div>
    )
}

export default MainNav;