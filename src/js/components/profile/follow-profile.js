import React, { useEffect, useState } from 'react'
import { toggleFollowProfile, getProfileFollowsProfile } from '../../utils/profile'
import axios from 'axios'
import api from '../../utils/api'

const FollowProfile = ({ profile, className, handleUpdate }) => {

    let _isMounted = false;
    const [isFollowed, setIsFollowed] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [toggleFollowIsLoading, setToggleFollowIsLoading] = useState(false)

    useEffect(() => {
        _isMounted = true;
        let source = axios.CancelToken.source();

        api.get(`/profiles/follows/profile?profile=${profile.id}`, { cancelToken: source.token })
            .then(response => _isMounted && setIsFollowed(response.data > 0))
            .finally(() => _isMounted && setIsLoading(false))
            .catch(err => {
                console.log(err.message);
            })

        return () => {
            _isMounted = false;
            if (source) source.cancel('Component did unmount')
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