import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../utils/api'
import GearIcon from '../../../assets/svg/gear.svg'
import DroneIcon from '../../../assets/svg/gear-drone.svg'
import BatteryIcon from '../../../assets/svg/gear-battery.svg'
import { toast } from 'react-toastify'
import Loader from '../../components/loader'

import GearSquareItem from '../../components/gear/gear-square-item'

const GearAll = (props) => {

    let _isMounted = false;

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const accessories = useSelector(state => state.gears.accessories);
    const batteries = useSelector(state => state.gears.batteries);

    useEffect(() => {
        _isMounted = true;

        dispatch({ type: 'FETCH_BATTERIES' })
        // dispatch({ type: 'FETCH_DRONES' })
        dispatch({ type: 'FETCH_BATTERIES' })

        const fetchPilotGear = async () => {
            try {
                let request = await api.get(`/pilot-gears/`);

                if (request.data) {
                    if (request.data.batteries) dispatch({ type: 'SET_BATTERIES', payload: request.data.batteries })
                    if (request.data.gears) dispatch({ type: 'SET_ACCESSORIES', payload: request.data.gears })
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

    return (
        <div className="w-full pt-5">
            <div className="px-4 flex">
                <div className="flex-1">
                    <header className="flex align-center mb-4">
                        <GearIcon className="w-7 h-7 fill-white block" />
                        <span className="text-white font-bold f4 mt-0 mb-0 ml-4">Accessories</span>
                    </header>
                    <main>
                        <ul className="flex flex-col align-center flex-wrap w-full">
                            {
                                accessories && accessories.map(accessory => <GearSquareItem key={accessory.id} name={accessory.name} type={'accessories'} image={accessory.image} slug={accessory.slug} category={accessory.gear_type ? accessory.gear_type.name : ''} manufacturer={accessory.manufacturer ? accessory.manufacturer.name : ''} />)
                            }
                        </ul>
                    </main>
                </div>
                <div className="flex-1 mx-4">
                    <header className="flex align-center mb-4">
                        <DroneIcon className="w-7 h-7 fill-white block" />
                        <span className="text-white font-bold f4 mt-0 mb-0 ml-4">Drones</span>
                    </header>
                    <main>
                        <ul className="flex flex-col align-center flex-wrap w-full">
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                        </ul>
                    </main>
                </div>
                <div className="flex-1">
                    <header className="flex align-center mb-4">
                        <BatteryIcon className="w-7 h-7 fill-white block" />
                        <span className="text-white font-bold f4 mt-0 mb-0 ml-4 ">Batteries</span>
                    </header>
                    <main>
                        <ul className="flex flex-col align-center flex-wrap w-full">
                            {
                                batteries && batteries.map(battery => <GearSquareItem key={battery.id} name={battery.name} type={'batteries'} image={battery.image} slug={battery.slug} category={battery.battery_type ? battery.battery_type.name : ''} manufacturer={battery.manufacturer ? battery.manufacturer.name : ''} />)
                            }
                        </ul>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default GearAll;