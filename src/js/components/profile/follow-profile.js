import React, { useEffect, useState } from 'react'
import { toggleFollowProfile, getProfileFollowsProfile } from '../../utils/profile'

const FollowProfile = ({ profile, className, handleUpdate }) => {

    const [isFollowed, setIsFollowed] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProfileFollowsProfile(profile.id)
            .then(response => setIsFollowed(response))
            .finally(setIsLoading(false))
    }, [])

    const handleClick = () => {
        toggleFollowProfile(profile.slug)
            .then(response => {
                getProfileFollowsProfile(profile.id)
                    .then(response => {
                        setIsFollowed(response)
                        handleUpdate();
                    })
            });
    }

    if (isLoading) return <></>

    return (
        <div className={`${className}`}>
            <span onClick={handleClick} role="button" className={`py-2 px-4 br-4 cursor-pointer outline-0 border-none ${isFollowed ? 'bg-white text-pink hover:bg-grey' : 'bg-pink text-white hover:bg-pink-dark'}`}>{isFollowed ? 'Unfollow' : 'Follow'}</span>
        </div>
    )
}

export default FollowProfile