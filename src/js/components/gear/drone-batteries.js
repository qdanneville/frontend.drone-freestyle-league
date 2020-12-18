import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../utils/api'
import Loader from '../loader'

import BatteryItem from './battery-item'

const DroneBattery = ({ currentBatteries, handleChangeBatteries }) => {

    let _isMounted = false;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const batteries = useSelector(state => state.gears.batteries)
    const [currentBatteriesId, setCurrentBatteriesID] = useState(currentBatteries)

    useEffect(() => {
        _isMounted = true;
        dispatch({ type: 'FETCH_BATTERIES' })

        api.get(`/pilot-gears/batteries`)
            .then(response => {
                const batteries = response.data
                if (batteries) dispatch({ type: 'SET_BATTERIES', payload: batteries })
                if (batteries && _isMounted) setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'SET_BATTERIES', payload: [] })
            })
            .finally(() => _isMounted && setIsLoading(false))

        return (() => {
            _isMounted = false;
        })
    }, [])

    useEffect(() => {
        handleChangeBatteries(currentBatteriesId);
    })


    const handleBatteryClick = (id, isUsed) => {
        if (isUsed) setCurrentBatteriesID(currentBatteriesId.filter(battery => battery !== id))
        else {
            let newCurrentBatteriesID = [...currentBatteriesId]
            newCurrentBatteriesID.push(id)
            setCurrentBatteriesID(newCurrentBatteriesID)
        }
    }

    let usedBatteries = batteries.filter(battery => currentBatteriesId.find(el => el === battery.id))
    let otherBatteries = batteries.filter(battery => currentBatteriesId.indexOf(battery.id) === -1)

    if (isLoading) return <Loader className="relative" />

    return (
        <div>
            <span className="text-green f4 mb-2 flex align-center">{`Used ${currentBatteriesId.length > 1 ? 'batteries' : 'battery'}`} <strong className="ml-2">(Click to remove)</strong></span>
            <div className="p-3 bg-grey-dark-light br-6 pt-6 px-6 bs-solid">

                {
                    usedBatteries.length > 0 ? usedBatteries.map(battery => <BatteryItem battery={battery} key={battery.id} isUsed handleClick={handleBatteryClick} fromDroneBatteries />)
                        : <span className="text-white font-normal f4 mb-3 block">This drone is not using any batteries</span>
                }
            </div>
            <span className="text-green f4 mb-2 flex align-center mt-8">{`Other ${otherBatteries.length > 1 ? 'batteries' : 'battery'}`}<strong className="ml-2">(Click to add)</strong></span>
            <div className="pt-2">
                {
                    otherBatteries.length > 0 ? otherBatteries.map(battery => <BatteryItem battery={battery} key={battery.id} handleClick={handleBatteryClick} fromDroneBatteries />)
                        : <span className="text-white font-normal f4 mb-3 block">You are using all your batteries</span>
                }
            </div>
        </div>
    )
}

export default DroneBattery