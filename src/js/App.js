import React, { useEffect } from 'react';
import { fetchUser } from './store/auth'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { AuthRoute } from './components/auth-route';
import Layout from './components/layout';

import Login from './pages/login';
import Register from './pages/register';

//Main nav routes
import Home from './pages/home';
import Profile from './pages/profile';
import Features from './pages/features';



const App = () => {

    const dispatch = useDispatch();
    const appInitialized = useSelector(state => state.auth.appInitialized);

    useEffect(() => {
        dispatch(fetchUser());
    }, [])

    if (!appInitialized) return <div className="w-full my-auto text-align-center"><i className="loader"></i></div>

    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Layout>
                    <AuthRoute path="/profile" component={Profile} />
                    <AuthRoute path="/features" component={Features} />
                    <AuthRoute path="/map" component={Home} />
                </Layout>
            </Switch>
        </Router>
    )
}

export default App