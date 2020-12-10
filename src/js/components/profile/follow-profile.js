import React, { useEffect, useState } from 'react'
import { toggleFollowProfile, getProfileFollowsProfile } from '../../utils/profile'

const FollowProfile = ({ profile, className, handleUpdate }) => {

    let _isMounted = false;
    const [isFollowed, setIsFollowed] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [toggleFollowIsLoading, setToggleFollowIsLoading] = useState(false)

    useEffect(() => {
        _isMounted = true;

        getProfileFollowsProfile(profile.id)
            .then(response => _isMounted && setIsFollowed(response))
            .finally(() => _isMounted && setIsLoading(false))

        return () => {
            _isMounted = false;
        }
    }, [])

    const handleClick = () => {
        setToggleFollowIsLoading(true);
        toggleFollowProfile(profile.slug)
            .then(response => {
                getProfileFollowsProfile(profile.id)
                    .then(response => {
                        setIsFollowed(response)
                        if (handleUpdate) handleUpdate();
                    })
                    .finally(() => setToggleFollowIsLoading(false))
            });
    }

    // if (isLoading) return <></>

    return (
        <div className={`${className}`}>
            <span onClick={handleClick} role="button" className={`inline-block loading-btn ${toggleFollowIsLoading ? 'loading-follow' : 'loaded'} ${isLoading && 'loading'} follow-profile py-2 px-4 br-4 cursor-pointer outline-0 border-none ${isFollowed ? 'bg-white text-pink hover:bg-grey' : 'bg-pink text-white hover:bg-pink-dark'}`}>{isFollowed ? 'Unfollow' : 'Follow'}</span>
        </div>
    )
}

export default FollowProfile