import React, { useEffect, useState } from "react"
import api from '../utils/api'

const UserLevel = ({ currentPoints, level, displayFirst }) => {

    const [currentLevel, setCurrentLevel] = useState(level)

    useEffect(() => {
        //If the level is an id (integer)
        //We need to retrieve the whole level object
        if (currentLevel === parseInt(currentLevel, 10)) {
            api.get(`/levels/${level}`)
                .then(response => response.data && setCurrentLevel(response.data))
        }
    }, [])


    let progression = currentLevel.total_points ? (currentPoints / currentLevel.total_points) * 100 : 0;

    return (
        <div className={`flex flex-col w-full`}>
            <div className={`bg-grey-dark w-full h-3 relative br-50 overflow-hidden mb-2 ${displayFirst === 'level' && 'order-2'}`}>
                <span className="bg-orange absolute t-0 l-0 h-full" style={{ width: progression + '%' }}></span>
            </div>
            <span className={`text-orange italic font-bold uppercase ${displayFirst === 'level' && 'order-1 mb-2'}`}>{`level ${currentLevel.number ? currentLevel.number : ''}`}</span>
        </div>
    )
}

export default UserLevel;