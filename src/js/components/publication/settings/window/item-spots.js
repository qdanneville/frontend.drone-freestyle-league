import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SpotItem from '../../../spot/spot-item'
import CommonInput from '../../../common/common-input'
import api from '../../../../utils/api'

const ItemSpots = () => {

    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.mySpots)
    const spotsLoading = useSelector(state => state.spots.isLoading)
    const [filter, setFilter] = useState('')
    const [searchNameFilter, setSearchNameFilter] = useState('')

    // TODO OPTIMIZE FILTER
    useEffect(() => {
        let params = `name_contains=${searchNameFilter}`

        api.get(`/spots/me?${params}`)
            .then(response => {
                const mySpots = response.data
                if (mySpots) dispatch({ type: 'SET_MY_SPOTS', payload: mySpots })
            })
            .catch(err => dispatch({ type: 'SET_MY_SPOTS', payload: [] }))
    }, [filter, searchNameFilter])

    return (
        <div className="overflow-y-scroll h-full">
            <div className="w-full sticky t-0 pt-4 pb-4 z-index-3 bg-dark">
                <CommonInput value={searchNameFilter} handleChange={setSearchNameFilter} type="text" name="search" className="search" placeholder="Search spots..." icon="search" />
            </div>
            <div className="relative mt-2">
                {spotsLoading
                    ? <Loader />
                    : spots && spots.map((spot) => <SpotItem key={spot.id} spot={spot} />)
                }
                {spots.length === 0 && <span>No spots found</span>}
            </div>
        </div>
    )

}

export default ItemSpots