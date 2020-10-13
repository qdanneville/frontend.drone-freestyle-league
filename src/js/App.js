import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import api from './utils/api'

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        api.get('/tests/').then(data => {
            console.log(data);
            dispatch({ type: 'APP_INITIALIZED' });
        })
    })

    return (<h1>Hey, DFL dashboard incoming</h1>)
};

export default App;