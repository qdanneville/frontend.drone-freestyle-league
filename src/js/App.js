import React, { useEffect } from 'react';
import { fetchUser } from './store/auth'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthRoute } from './components/auth-route';
import Layout from './components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/login';
import Register from './pages/register';

//Main nav routes
import Dashboard from './pages/dashboard';
import Map from './pages/map';
import MyFleet from './pages/my-fleet';
import MySpots from './pages/spot/my-spots';
import MyCommunity from './pages/my-community';
import MyForms from './pages/my-forms';
import Settings from './pages/settings';

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
                    <AuthRoute path="/dashboard/" component={Dashboard} />
                    <AuthRoute path="/map/" component={Map} />
                    <AuthRoute path="/fleet/" component={MyFleet} />
                    <AuthRoute path="/spots/" component={MySpots} />
                    <AuthRoute path="/community/" component={MyCommunity} />
                    <AuthRoute path="/forms/" component={MyForms} />
                    <AuthRoute path="/settings/" component={Settings} />
                </Layout>
            </Switch>
            <ToastContainer />
        </Router>
    )
}

export default App