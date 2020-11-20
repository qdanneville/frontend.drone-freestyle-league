import React, { useState, useEffect } from 'react'
import { getPilotSpotsCount } from '../../utils/spot'
import { getProfileFollowersNumber, getProfileFolloweesNumber } from '../../utils/profile'

const BasicInformations = ({ profile, className, update }) => {

    const [spotsCount, setSpotsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followeesCount, setFolloweesCount] = useState(0);

    useEffect(() => {
        getPilotSpotsCount(profile.type.pilot_id)
            .then(spots => setSpotsCount(spots))

        getProfileFollowersNumber(profile.slug)
            .then(followersNb => setFollowersCount(followersNb))

        getProfileFolloweesNumber(profile.slug)
            .then(followeesNb => setFolloweesCount(followeesNb))
    }, [update])

    return (
        <div className={`py-4 px-2 bg-dark br-6 shadow-7 ${className}`}>
            <ul className="flex">
                <li className="flex flex-col align-center justify-center flex-1 w-20">
                    <span className="text-white f4 font-normal">{spotsCount}</span>
                    <span className="text-grey-dark f4 font-normal">Spots</span>
                </li>
                <li className="flex flex-col align-center justify-center flex-1 w-20 ml-2">
                    <span className="text-white f4 font-normal">{followersCount}</span>
                    <span className="text-grey-dark f4 font-normal">Followers</span>
                </li>
                <li className="flex flex-col align-center justify-center flex-1 w-20 ml-2 mr-3">
                    <span className="text-white f4 font-normal">{followeesCount}</span>
                    <span className="text-grey-dark f4 font-normal">Following</span>
                </li>
            </ul>
        </div>
    )
}

export default BasicInformations