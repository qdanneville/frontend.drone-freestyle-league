import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";

import { doRegister } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';

import Dfl from '../../assets/svg/dfl-logo.svg';

const Register = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
            username,
            password,
            name,
            email,
            role
        }

        dispatch(doRegister(body)).then(success => {
            if (success) history.push("/login")
        }).catch(err => {
            setError(err.message)
        })
    }

    return (
        <div className="flex flex-col justify-center my-auto">
            <Dfl className="stroke-teal" />
            <header className="flex justify-center align-items">
                <h1 className="text-white f1">Register page</h1>
            </header>
            {
                isLoading
                    ? <i className="loader"></i>
                    :
                    <div>
                        <form onSubmit={handleSubmit} className={error ? "form-error bc-teal bw-2 bs-solid py-8 px-6 br-6 shadow-3 bg-white" : "bc-teal bw-2 bs-solid py-8 px-6 br-6 shadow-2 bg-white"}>
                            {error && <span className="font-bold text-white f6 block bc-red bg-pink py-2 px-2 br-4 text-align-center mb-2">{error}</span>}
                            <div className="flex flex-col">
                                <label className="font-normal f4 mb-1">Username</label>
                                <input className="f4 placeholder:text-grey bs-solid bw-1 bc-grey-2 br-4 py-1 px-1" onChange={(event) => setUsername(event.target.value)} type="text" placeholder="identifier" required />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="font-normal f4 mb-1">name</label>
                                <input className="f4 placeholder:text-grey bs-solid bw-1 bc-grey-2 br-4 py-1 px-1" onChange={(event) => setName(event.target.value)} type="text" placeholder="identifier" required />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="font-normal f4 mb-1">email</label>
                                <input className="f4 placeholder:text-grey bs-solid bw-1 bc-grey-2 br-4 py-1 px-1" onChange={(event) => setEmail(event.target.value)} type="email" placeholder="identifier" required />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="font-normal f4 mb-1">password</label>
                                <input className="f4 placeholder:text-grey bs-solid bw-1 bc-grey-2 br-4 py-1 px-1" onChange={(event) => setPassword(event.target.value)} type="password" placeholder="identifier" required />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="font-normal f4 mb-1">role</label>
                                <input className="f4 placeholder:text-grey bs-solid bw-1 bc-grey-2 br-4 py-1 px-1" onChange={(event) => setRole(event.target.value)} type="text" placeholder="identifier" required />
                            </div>
                            <br />
                            <button className="btn w-full" type="submit">Register</button>
                            <br />
                        </form>
                        <footer className="flex justify-center align-items mt-2">
                            <Link to="/login" className="underline text-white">Login</Link>
                        </footer>
                    </div>
            }
        </div>
    )
}

export default Register;