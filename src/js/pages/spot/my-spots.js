import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/api'

import SpotItem from '../../components/spot/spot-item'
import Loader from '../../components/loader'

import AddIcon from '../../../assets/svg/add.svg';
import { Link } from 'react-router-dom';

const MySpots = (props) => {

    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.mySpots)
    const spotsLoading = useSelector(state => state.spots.isLoading)

    useEffect(() => {
        dispatch({ type: 'FETCH_MY_SPOTS' })

        api.get('/spots/me')
            .then(response => {
                const mySpots = response.data
                if (mySpots) dispatch({ type: 'SET_MY_SPOTS', payload: mySpots })
            })
    }, [])

    if (spotsLoading && spots.length == 0) return <Loader />

    return (
        <div className="common-container">
            <header className="flex justify-between align-center">
                <h1 className="text-yellow good-times f2">My spots</h1>
                <Link to="/spots/create" className="text-dark fill-dark f4 flex justify-center align-center bg-grey-light hover:bg-grey py-2 px-4 br-4 cursor-pointer"> <AddIcon className="stroke-15 w-4 h-4 mr-3" />Create spot</Link>
            </header>
            <div className="w-full">
                <input className="common-input search" type="text" placeholder="Search spots" />
            </div>
            <div className="flex flex-col w-full">
                {
                    !spotsLoading && spots && spots.map(spot => <SpotItem key={spot.id} spot={spot} />)
                }
            </div>
        </div>
    )
}

export default MySpots;