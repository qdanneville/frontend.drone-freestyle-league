import React, { useState } from "react"

const UserLevel = ({ currentPoints, level }) => {

    console.log(level);
    console.log(currentPoints);

    let progression = (currentPoints / level.total_points) * 100;
    console.log(Math.round(progression));

    return (
        <div className="flex flex-col">
            <div className="bg-grey-dark w-full h-3 relative br-50 overflow-hidden mb-2">
                <span className="bg-orange absolute t-0 l-0 h-full" style={{width:progression + '%'}}></span>
            </div>
            <span className="text-orange italic font-bold uppercase">{`level ${level.number}`}</span>
        </div>
    )
}

export default UserLevel;