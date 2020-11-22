import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { doLogin } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../components/auth-route';

import Dfl from '../../assets/svg/dfl-logo.svg';

import CommonInput from '../components/common/common-input'

import Fly from '../../assets/svg/fly.svg';
import FlyOrange from '../../assets/svg/fly-orange.svg';
import Advertize from '../../assets/svg/instagram.svg';
import Share from '../../assets/svg/share.svg';
import Win from '../../assets/svg/win.svg';
import BlueRectangles from '../../assets/svg/blue-rectangles.svg';
import OrangeRectangles from '../../assets/svg/orange-rectangles.svg';
import PinkRectangles from '../../assets/svg/pink-rectangles.svg';

const Login = (props) => {

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const isLogged = useAuth();

    const [identifier, setidentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        dispatch(doLogin(identifier, password)).catch(err => {
            setError(err.message)
        })
    }

    if (isLogged) return <Redirect to="/map" />

    return (
        <div className="app-wrapper flex-col">
            <header className="common-container py-3">
                <Dfl className="" />
            </header>
            <main className="flex justify-center align-center my-auto common-container relative">
                <div className="absolute l-0 display-none-md">
                    <h1 className="features text-white f45 good-times mt-0 uppercase text-shadow-1 ml-4 mr-3 pt-4 text-align-right">For pilots</h1>
                    <ul className="flex flex-col features">
                        <li className="relative flex align-center my-2 py-1 justify-between">
                            <i className="absolute w-full h-full bw-1 bc-teal bs-solid t-0 l-0 common-skew-inverse"></i>
                            <Fly className="w-8 absolute l-3" />
                            <span className="m-0 good-times text-white uppercase f5 pr-2 pl-35">Fly</span>
                            <BlueRectangles className="transform-inverse" />
                        </li>
                        <li className="relative flex align-center my-2 py-1 -mr-6 justify-between">
                            <i className="absolute w-full h-full bw-1 bc-teal bs-solid t-0 l-0 common-skew-inverse"></i>
                            <Share className="w-8 absolute l-3" />
                            <span className="m-0 good-times text-white uppercase f5 pr-2 pl-35">Share</span>
                            <PinkRectangles className="transform-inverse" />
                        </li>
                        <li className="relative flex align-center my-2 py-1 -mr-12 justify-between">
                            <i className="absolute w-full h-full bw-1 bc-teal bs-solid t-0 l-0 common-skew-inverse"></i>
                            <Win className="w-8 absolute l-3" />
                            <span className="m-0 good-times text-white uppercase f5 pr-2 pl-35 ml-13">Win</span>
                            <OrangeRectangles className="transform-inverse" />
                        </li>
                    </ul>
                </div>
                <div>
                    <header className="flex justify-center align-items mb-6">
                        <h1 className="text-white f45 max-width-50-percent good-times mt-0">Log in</h1>
                    </header>
                    <div className="max-width-300-px my-auto">
                        <form onSubmit={handleSubmit} className={error ? "" : ""} style={{ minWidth: "300px" }}>
                            {error && <span className="font-bold text-white f6 block bc-red bg-red py-2 px-2 br-4 text-align-center mb-2">{error}</span>}
                            <div className="flex flex-col">
                                <label className="text-teal f4 mb-2 flex align-center">Username or email</label>
                                <CommonInput value={identifier} handleChange={setidentifier} type="text" name="identifier" className="" placeholder="Identifier" required />
                            </div>
                            <div className="flex flex-col mt-3">
                                <label className="text-teal f4 mb-2 flex align-center">Password</label>
                                <CommonInput value={password} handleChange={setPassword} type="password" name="identifier" className="" placeholder="*********" required />
                            </div>
                            <button className={`mt-6 btn w-full ${isLoading && 'loading'}`} type="submit">Log in</button>
                        </form>
                        <footer className="flex justify-center align-center flex-col mt-4">
                            <span className="f6 text-grey">Not yet registred ?</span>
                            <Link to="/register" className="underline text-white f6 good-times mt-2 common-outline p-2">Register</Link>
                        </footer>
                    </div>
                </div>
                <div className="absolute r-0 display-none-md">
                    <h1 className="features text-white f45 good-times mt-0 uppercase text-shadow-1 ml-4 mb-4 pt-4">For brands</h1>
                    <ul className="flex flex-col features">
                        <li className="relative flex align-center my-2 py-1 pr-3">
                            <i className="absolute w-full h-full bw-1 bc-orange bs-solid t-0 l-0 common-skew"></i>
                            <OrangeRectangles />
                            <span className="m-0 good-times text-white uppercase f5 pl-2 pr-20">Advertize</span>
                            <Advertize className="w-8 absolute r-3" />
                        </li>
                        <li className="relative flex align-center my-2 py-1 pr-3 -ml-6">
                            <i className="absolute w-full h-full bw-1 bc-orange bs-solid t-0 l-0 common-skew"></i>
                            <OrangeRectangles />
                            <span className="m-0 good-times text-white uppercase f5 pl-2 pr-20">rent spots</span>
                            <FlyOrange className="w-8 absolute r-3" />
                        </li>
                        <li className="relative flex align-center my-2 py-1 pr-3 -ml-12">
                            <i className="absolute w-full h-full bw-1 bc-orange bs-solid t-0 l-0 common-skew"></i>
                            <OrangeRectangles />
                            <span className="m-0 good-times text-white uppercase f5 pl-2 pr-20">Season Partner</span>
                            <Win className="w-8 absolute r-3" />
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default Login;