import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/api'

import AccessoryItem from '../../components/gear/accessory-item'

import CommonInput from '../../components/common/common-input'
import Loader from '../../components/loader'

import AddIcon from '../../../assets/svg/add.svg';
import { Link } from 'react-router-dom';

const GearAccessories = (props) => {

    let _isMounted = false;

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const accessories = useSelector(state => state.gears.accessories);
    const [filter, setFilter] = useState('')
    const [searchNameFilter, setSearchNameFilter] = useState('')

    useEffect(() => {
        _isMounted = true;
        dispatch({ type: 'FETCH_ACCESSORIES' })

        api.get(`/pilot-gears/accessories`)
            .then(response => {
                const accessories = response.data
                if (accessories) dispatch({ type: 'SET_ACCESSORIES', payload: accessories })
                if (accessories && _isMounted) setIsLoading(false)
            })
            .catch(err => dispatch({ type: 'SET_ACCESSORIES', payload: [] }))

        return (() => {
            _isMounted = false;
        })
    }, [])

    let filteredAccessories = accessories.filter(accessory => {
        if (accessory.name.toLowerCase().includes(searchNameFilter.toLowerCase())) return accessory
        else if (accessory.gear_type && accessory.gear_type.name.toLowerCase().includes(searchNameFilter.toLowerCase())) return accessory
        else if (accessory.manufacturer && accessory.manufacturer.name.toLowerCase().includes(searchNameFilter.toLowerCase())) return accessory
    })

    return (
        <div className="w-full">
            <header className="flex flex-col w-full px-10 pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 sticky t-0 z-index-7 bg-dark pt-10">
                <div className="flex justify-between align-center mb-3">
                    <h1 className="text-white f4 mt-0 mb-0">Accessories</h1>
                    <Link to="/gear/accessories/create" className="text-dark fill-dark f4 flex justify-center align-center bg-grey-light hover:bg-grey py-2 px-4 br-4 cursor-pointer"> <AddIcon className="stroke-15 w-4 h-4 mr-3" />Create accessory</Link>
                </div>
                <div className="w-full mt-4">
                    <CommonInput value={searchNameFilter} handleChange={setSearchNameFilter} type="text" name="search" className="search" placeholder="Search accessory..." icon="search" />
                </div>
                <ul className="flex align-center mt-2 justify-between">
                    <ul className="w-half flex align-center">
                        <li tabIndex="0" onClick={() => setFilter('')} className={`common-active-ui py-2 px-4 br-4 text-grey-light cursor-pointer mr-2 common-outline ${filter === '' ? 'active' : ''}`}>
                            <span>Filter 1</span>
                        </li>
                        <li tabIndex="0" onClick={() => setFilter(filter === 'public' ? '' : 'public')} className={`common-active-ui py-2 px-4 br-4 text-grey-light cursor-pointer mr-2 common-outline ${filter === 'public' ? 'active' : ''}`}>
                            <span>Filter 2</span>
                        </li>
                        <li tabIndex="0" onClick={() => setFilter(filter === 'private' ? '' : 'private')} className={`common-active-ui py-2 px-4 br-4 text-grey-light cursor-pointer mr-2 common-outline ${filter === 'private' ? 'active' : ''}`}>
                            <span>Filter 3</span>
                        </li>
                    </ul>
                </ul>
            </header>
            <div className="flex flex-col w-full px-10 relative">
                <div className="flex align-center overflow-hidden sticky bg-dark py-3 z-index-8" style={{ top: '195px' }}>
                    <div className="w-20 mr-4">
                        <span className="text-grey uppercase f6">Image</span>
                    </div>
                    <div className="text-white mr-4 w-40">
                        <span className="text-grey uppercase f6 font-normal">Name</span>
                    </div>
                    <div className="flex align-center justify-between flex-1 display-none-md">
                        <div className="flex align-center justify-center px-2 w-30">
                            <span className="text-grey uppercase f6 font-normal">type</span>
                        </div>
                        <div className="flex align-center justify-center w-20">
                            <span className="text-grey uppercase f6 font-normal text-align-center">Constructor</span>
                        </div>
                        <div className="flex flex-col justify-center align-center fill-grey py-2 px-2 w-20">
                            <span className="text-grey uppercase f6 font-normal text-align-center">Link to vendor</span>
                        </div>
                        <div className="flex align-center justify-center w-20">
                            <span className="text-grey uppercase f6 font-normal mr-2">Rating</span>
                        </div>
                        <div className="flex flex-col justify-center align-center cursor-pointer fill-grey py-2 px-2 w-10">
                            <span className="text-grey uppercase f6 font-normal">Likes</span>
                        </div>
                        <div className="flex flex-col justify-center align-center cursor-pointer fill-grey py-2 px-2 w-10">
                            <span className="text-grey uppercase f6 font-normal">Modified</span>
                        </div>
                        <div className="flex align-center w-20 h-full justify-end pr-4">
                            <span className="text-grey uppercase f6 font-normal">Edit</span>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    {isLoading
                        ? <Loader />
                        : accessories && filteredAccessories && filteredAccessories.map(accessory => <AccessoryItem accessory={accessory} key={accessory.id} />)
                    }
                    {filteredAccessories.length === 0 && <span>No accessories found</span>}
                </div>
            </div>

        </div>
    )
}

export default GearAccessories;