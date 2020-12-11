import React, { useState, useEffect } from 'react';

import GearIcon from '../../../assets/svg/gear.svg'
import DroneIcon from '../../../assets/svg/gear-drone.svg'
import BatteryIcon from '../../../assets/svg/gear-battery.svg'

const SpotsList = (props) => {

    return (
        <div className="w-full pt-5">
            <div className="px-4 flex">
                <div className="flex-1">
                    <header className="flex align-center mb-4">
                        <GearIcon className="w-7 h-7 fill-white block" />
                        <span className="text-white font-bold f4 mt-0 mb-0 ml-4">Pilot Gear</span>
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
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                            <li className="p-10 flex-1 bg-grey-dark-light my-2 mb-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full mr-4 mr-0-xs">

                            </li>
                        </ul>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SpotsList;