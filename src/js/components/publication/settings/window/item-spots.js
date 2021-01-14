import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SpotItem from '../../../spot/spot-item'
import CommonInput from '../../../common/common-input'
import PublicationItem from './publication-item'
import api from '../../../../utils/api'
import Loader from '../../../loader'

const ItemSpots = ({ handleClick }) => {

    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.mySpots)
    const spotsLoading = useSelector(state => state.spots.isLoading)
    const [filter, setFilter] = useState('')
    const [searchNameFilter, setSearchNameFilter] = useState('')

    useEffect(() => {
        let params = `name_contains=${searchNameFilter}`

        dispatch({ type: 'FETCH_MY_SPOTS' })

        api.get(`/spots/me?${params}`)
            .then(response => {
                const mySpots = response.data
                if (mySpots) dispatch({ type: 'SET_MY_SPOTS', payload: mySpots })
            })
            .catch(err => dispatch({ type: 'SET_MY_SPOTS', payload: [] }))
    }, [filter, searchNameFilter])

    return (
        <div className="overflow-y-scroll h-full w-full">
            <div className="w-full sticky t-0 pt-4 pb-4 z-index-3 bg-dark">
                <CommonInput value={searchNameFilter} handleChange={setSearchNameFilter} type="text" name="search" className="search" placeholder="Search spots..." icon="search" />
            </div>
            <div className="relative mt-2">
                {spotsLoading
                    ? <Loader className="relative" />
                    : spots && spots.map((spot) => <PublicationItem key={spot.id} item={{ id: spot.id, itemType: 'spot', image: spot.image || null, name: spot.name, type: spot.spot_type.name || '', customInfo: spot.privacy || '...' }} handleClick={handleClick} />)
                }
                {spots.length === 0 && <span>No spots found</span>}
            </div>
        </div>
    )

}


export default ItemSpots