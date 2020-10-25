import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";

import { doRegister } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';

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

    const [profile, setProfile] = useState('brand');

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        const body = {
            username,
            password,
            name,
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
        <div className="app-wrapper bg-dark-2 flex-col">
            <header className="common-container py-3">
                <Dfl className="" />
            </header>
            <main className="flex flex-col justify-center my-auto py-10">
                <div className="flex justify-between align-start">
                    <div>
                        <header className="flex justify-between">
                            <h1 className="text-white f45 max-width-50-percent good-times mt-0">{profile === "pilot" ? "Pilot registration" : "Brand registration"}</h1>
                            <label className="toggle labels">
                                <input type="checkbox" onChange={handleProfileChange} />
                                <span className="slider">
                                    <i className="circle"></i>
                                </span>
                            </label>
                        </header>
                        <div>
                            <form onSubmit={handleSubmit} className={error ? "mt-4" : "mt-4"}>
                                {error && <span className="font-bold text-white f6 block bc-red bg-pink py-2 px-2 br-4 text-align-center mb-2">{error}</span>}
                                <div className="flex flex-col">
                                    <label className="font-normal f5 text-white mb-1">{profile === "pilot" ? "Username" : "Brand name"}</label>
                                    <input className="common-input" onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Username" required />
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="font-normal f5 text-white mb-1">Full name</label>
                                    <input className="common-input" onChange={(event) => setName(event.target.value)} type="text" placeholder="Full name" required />
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="font-normal f5 text-white mb-1">email</label>
                                    <input className="common-input" onChange={(event) => setEmail(event.target.value)} type="email" placeholder="example@example.com" required />
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="font-normal f5 text-white mb-1">password</label>
                                    <input className="common-input" onChange={(event) => setPassword(event.target.value)} type="password" placeholder="*********" required />
                                </div>
                                <br />
                                <button className="btn" type="submit">Register</button>
                                <br />
                            </form>
                            <footer className="flex justify-start flex-col mt-4">
                                <span className="f7 text-grey-dark">Already registred ?</span>
                                <Link to="/login" className="underline text-white f6 good-times mt-2">Login</Link>
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