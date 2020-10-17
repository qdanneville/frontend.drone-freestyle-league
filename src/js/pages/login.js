import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { doLogin } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../components/auth-route';

import Dfl from '../../assets/svg/dfl-logo.svg';

const Login = (props) => {

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const isLogged = useAuth();

    const [identifier, setidentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(doLogin(identifier, password)).catch(err => {
            setError(err.message)
        })
    }

    if (isLogged) return <Redirect to="/" />

    return (
        <div className="flex flex-col justify-center my-auto">
            <Dfl className="stroke-teal" />
            <header className="flex justify-center align-items">
                <h1 className="text-white f1">Login page</h1>
            </header>
            {
                isLoading
                    ? <i className="loader"></i>
                    :
                    <div>
                        <form onSubmit={handleSubmit} className={error ? "form-error bc-teal bw-2 bs-solid py-8 px-6 br-6 shadow-3 bg-white" : "bc-teal bw-2 bs-solid py-8 px-6 br-6 shadow-2 bg-white"}>
                            {error && <span className="font-bold text-white f6 block bc-red bg-pink py-2 px-2 br-4 text-align-center mb-2">{error}</span>}
                            <div className="flex flex-col">
                                <label className="font-normal f4 mb-1">Username or email</label>
                                <input className="f4 placeholder:text-grey bs-solid bw-1 bc-grey-2 br-4 py-1 px-1" onChange={(event) => setidentifier(event.target.value)} type="text" placeholder="identifier" required />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="font-normal f4 mt-2 mb-1">Password</label>
                                <input className="f4 placeholder:text-grey bs-solid bw-1 bc-grey-2 br-4 py-1 px-1" onChange={(event) => setPassword(event.target.value)} type="password" placeholder="*****" required />
                            </div>
                            <br />
                            <button className="btn w-full" type="submit">Log in</button>
                            <br />
                        </form>
                        <footer className="flex justify-center align-items mt-2">
                            <Link to="/register" className="underline text-white">Register</Link>
                        </footer>
                    </div>
            }
        </div>
    )
}

export default Login;