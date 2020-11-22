import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";

import { doRegister } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';

import CommonInput from '../components/common/common-input'

import Fly from '../../assets/svg/fly.svg';
import FlyOrange from '../../assets/svg/fly-orange.svg';
import Advertize from '../../assets/svg/instagram.svg';
import Share from '../../assets/svg/share.svg';
import Win from '../../assets/svg/win.svg';
import BlueRectangles from '../../assets/svg/blue-rectangles.svg';
import OrangeRectangles from '../../assets/svg/orange-rectangles.svg';
import PinkRectangles from '../../assets/svg/pink-rectangles.svg';

import Dfl from '../../assets/svg/dfl-logo.svg';

const Register = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);

    const [profile, setProfile] = useState('pilot');

    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        const body = {
            username,
            password,
            display_name: displayName,
            email,
            role: profile
        }

        dispatch(doRegister(body)).then(success => {
            if (success) history.push("/login")
        }).catch(err => {
            setError(err.message)
        })
    }

    const handleProfileChange = (event) => {
        setProfile(profile === 'pilot' ? 'brand' : 'pilot')
    }

    return (
        <div className="app-wrapper flex-col">
            <header className="common-container py-3">
                <Dfl className="" />
            </header>
            <main className="flex flex-col justify-center my-auto py-10">
                <div className="flex justify-between align-start">
                    <div>
                        <header className="flex justify-between">
                            <h1 className="text-white f45 max-width-50-percent good-times mt-0">Registration</h1>
                            {/* <label className="toggle labels">
                                <input type="checkbox" onChange={handleProfileChange} />
                                <span className="slider">
                                    <i className="circle"></i>
                                </span>
                            </label> */}
                        </header>
                        <div style={{ minWidth: '300px' }}>
                            <form onSubmit={handleSubmit} className={error ? "mt-4" : "mt-4"}>
                                {error && <span className="font-bold text-white f6 block bc-red bg-red py-2 px-2 br-4 text-align-center mb-2">{error}</span>}
                                <div className="flex flex-col">
                                    <label className="text-teal f4 mb-2 flex align-center">Username <strong className="text-grey f5 font-normal ml-1">(Can be used to log in)</strong></label>
                                    <CommonInput value={username} handleChange={setUsername} type="text" name="username" className="" placeholder="@best fpv pilot" required />
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="text-teal f4 mb-2 flex align-center">Displayed name <strong className="text-grey f5 font-normal ml-1">(What other pilot or brand sees)</strong></label>
                                    <CommonInput value={displayName} handleChange={setDisplayName} type="text" name="displayName" className="" placeholder="Johnny" required />
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="text-teal f4 mb-2 flex align-center">Email <strong className="text-grey f5 font-normal ml-1">(Can also be used to log in)</strong></label>
                                    <CommonInput value={email} handleChange={setEmail} type="email" name="email" className="" placeholder="johnny@example.com" required />
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="text-teal f4 mb-2 flex align-center">Password</label>
                                    <CommonInput value={password} handleChange={setPassword} type="password" name="password" className="" placeholder="**********" required />
                                </div>
                                <br />
                                <div className="flex mt-0 mb-3">
                                    <span className="text-grey font-normal f5">By signing up, I agree to the <Link className="text-teal common-outline" to="/terms-of-use">Terms of Use</Link></span>
                                </div>
                                <button className={`btn ${isLoading && 'loading'}`} type="submit">Register</button>
                                <br />
                            </form>
                            <footer className="flex justify-start flex-col mt-4">
                                <span className="f6 text-grey">Already registred ?</span>
                                <div className="flex">
                                    <Link to="/login" className="flex underline text-white f6 good-times mt-2 common-outline p-2">Login</Link>
                                </div>
                            </footer>
                        </div>
                    </div>
                    {
                        profile === 'pilot'
                            ?
                            <div className="pl-40 display-none-md">
                                <h1 className="features text-white f45 good-times mt-0 uppercase text-shadow-1 ml-4 mb-14">For pilots</h1>
                                <ul className="flex flex-col features">
                                    <li className="relative flex align-center my-2 py-1 pr-3">
                                        <i className="absolute w-full h-full bw-1 bc-teal bs-solid t-0 l-0 common-skew"></i>
                                        <BlueRectangles />
                                        <span className="m-0 good-times text-white uppercase f5 pl-2 pr-40">Fly</span>
                                        <Fly className="w-8 absolute r-3" />
                                    </li>
                                    <li className="relative flex align-center my-2 py-1 pr-3 -ml-6">
                                        <i className="absolute w-full h-full bw-1 bc-teal bs-solid t-0 l-0 common-skew"></i>
                                        <PinkRectangles />
                                        <span className="m-0 good-times text-white uppercase f5 pl-2 pr-40">Share</span>
                                        <Share className="w-8 absolute r-3" />
                                    </li>
                                    <li className="relative flex align-center my-2 py-1 pr-3 -ml-12">
                                        <i className="absolute w-full h-full bw-1 bc-teal bs-solid t-0 l-0 common-skew"></i>
                                        <OrangeRectangles />
                                        <span className="m-0 good-times text-white uppercase f5 pl-2 pr-40">Win</span>
                                        <Win className="w-8 absolute r-3" />
                                    </li>
                                </ul>
                            </div>
                            :
                            <div className="pl-40 display-none-md">
                                <h1 className="features text-white f45 good-times mt-0 uppercase text-shadow-1 ml-4 mb-14">For brands</h1>

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
                    }
                </div>
            </main >
        </div>
    )
}

export default Register;