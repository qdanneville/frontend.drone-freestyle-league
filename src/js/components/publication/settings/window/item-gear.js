import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SpotItem from '../../../spot/spot-item'
import CommonInput from '../../../common/common-input'
import PublicationItem from './publication-item'
import api from '../../../../utils/api'
import Loader from '../../../loader'

const ItemGear = ({ handleClick, itemList }) => {


    //State
    let _isMounted = false;
    const [filter, setFilter] = useState('drones')
    const [searchNameFilter, setSearchNameFilter] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    //Store
    const dispatch = useDispatch();
    const accessories = useSelector(state => state.gears.accessories);
    const batteries = useSelector(state => state.gears.batteries);
    const drones = useSelector(state => state.gears.drones);

    useEffect(() => {

        _isMounted = true;

        dispatch({ type: 'FETCH_ACCESSORIES' })
        dispatch({ type: 'FETCH_DRONES' })
        dispatch({ type: 'FETCH_BATTERIES' })

        const fetchPilotGear = async () => {
            try {
                let request = await api.get(`/pilot-gears/`);

                if (request.data) {
                    if (request.data.batteries) dispatch({ type: 'SET_BATTERIES', payload: request.data.batteries })
                    if (request.data.gears) dispatch({ type: 'SET_ACCESSORIES', payload: request.data.gears })
                    if (request.data.drones) dispatch({ type: 'SET_DRONES', payload: request.data.drones })
                }
            }
            catch (err) {
                toast.error("Ewww, something went wrong, please try again");
            }

            if (_isMounted) setIsLoading(false);
        }

        fetchPilotGear();

        return (() => {
            _isMounted = false;
        })
    }, [])

    if (isLoading) return <Loader className="relative" />


    //Create droneParts item list 
    let dronePartsList = []
    drones.forEach(({ drone_parts }) => drone_parts.forEach(el => dronePartsList.push(el)))

    let filteredList = []

    if (filter === 'drones') filteredList = drones
    else if (filter === 'accessories') filteredList = accessories
    else if (filter === 'batteries') filteredList = batteries
    else if (filter === 'drone-parts') filteredList = dronePartsList
    else filteredList = drones


    // Mapping through all gears
    // Mapping through all item list id
    // if a gear item id is found in the item list, we're filtering out this spot
    if (itemList) {
        filteredList = filteredList.filter(item => !(itemList.indexOf(filter + '-' + item.id) !== -1))
    }

    //If the user is using the name filter field
    filteredList = filteredList.filter(item => {
        if (item.name.toLowerCase().includes(searchNameFilter.toLowerCase())) return item
    })

    return (
        <div className="overflow-y-scroll h-full w-full">
            <div className="w-full sticky t-0 pt-4 pb-4 z-index-3 bg-dark">
                <CommonInput value={searchNameFilter} handleChange={setSearchNameFilter} type="text" name="search" className="search" placeholder="Search by name ..." icon="search" />
                <ul className="flex align-center mt-2 justify-between">
                    <ul className="w-full flex align-center">
                        <li tabIndex="0" onClick={() => setFilter(filter === 'drones' ? 'drones' : 'drones')} className={`common-active-ui py-2 px-4 br-4 text-grey-light cursor-pointer mr-2 common-outline ${filter === 'drones' ? 'active' : ''}`}>
                            <span>Drones</span>
                        </li>
                        <li tabIndex="0" onClick={() => setFilter(filter === 'accessories' ? 'drones' : 'accessories')} className={`common-active-ui py-2 px-4 br-4 text-grey-light cursor-pointer mr-2 common-outline ${filter === 'accessories' ? 'active' : ''}`}>
                            <span>Accessories</span>
                        </li>
                        <li tabIndex="0" onClick={() => setFilter(filter === 'batteries' ? 'drones' : 'batteries')} className={`common-active-ui py-2 px-4 br-4 text-grey-light cursor-pointer mr-2 common-outline ${filter === 'batteries' ? 'active' : ''}`}>
                            <span>Batteries</span>
                        </li>
                        <li tabIndex="0" onClick={() => setFilter(filter === 'drone-parts' ? 'drones' : 'drone-parts')} className={`common-active-ui py-2 px-4 br-4 text-grey-light cursor-pointer mr-2 common-outline ${filter === 'drone-parts' ? 'active' : ''}`}>
                            <span>Drone parts</span>
                        </li>
                    </ul>
                </ul>
            </div>
            <div className="relative mt-2 pb-10">
                {
                    filteredList && filteredList.map((item) => <PublicationItem key={item.id} item={{ id: item.id, itemType: filter, image: item.image || null, name: item.name, type: (item && item.type && item.type.name) || '', customInfo: (item && item.manufacturer && item.manufacturer.name) || '...' }} handleClick={handleClick} />)
                }
                {filteredList.length === 0 && <span>No gear found</span>}
            </div>
        </div>
    )

}

export default ItemGear