import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearToken } from '../utils/local-storage'

import { Link } from 'react-router-dom';
import DflPng from '../../assets/dfl-logo.png';
import DflSvg from '../../assets/svg/dfl-logo.svg';

const user = null

const Header = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    const signout = () => {
        clearToken();

        dispatch({
            type: 'CLEAR_AUTH_USER'
        })

        dispatch({
            type: 'CLEAR_AUTH_TOKEN'
        })

        history.replace({ pathname: "/login" })
    }

    return (
        <header className="text-white">
            <nav className="common-container py-3">
                <ul className="flex justify-between">
                    <li className="w-20"><img src={DflPng} alt="DFL | Logo" /></li>
                    {
                        user ?
                            (
                                <li className="flex flex-col align-start">
                                    <div className="flex justify-center items-center">
                                        <i className="w-13 h-13 br-50 bg-yellow shadow-1"></i>
                                        <div className="flex flex-col ml-2 ">
                                            <span className="font-bold f4">{user.username}</span>
                                            <a className="underline f6 mt-1 cursor-pointer" onClick={signout}>Sign out</a>
                                        </div>
                                    </div>
                                </li>
                            ) :
                            (
                                <li>
                                    <Link className="btn" to="/login">Sign in</Link>
                                </li>
                            )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header