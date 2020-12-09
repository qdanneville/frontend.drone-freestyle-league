import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProfileFollowers, getProfileFollowees } from '../../utils/profile'
import { NavLink } from 'react-router-dom';
import FollowProfile from './follow-profile'
import config from '../../../../config'


const ProfileCommunity = ({ fromModal, type, slug, name, className, avatar }) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user)
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        if (slug && type) {
            type === 'followers'
                ? getProfileFollowers(slug).then(followees => setProfiles(followees))
                : getProfileFollowees(slug).then(followees => setProfiles(followees))
        } else {
            if (currentUser && currentUser.profile && currentUser.profile.profile && type) {
                type === 'followers'
                    ? getProfileFollowers(currentUser.profile.profile.slug).then(followees => setProfiles(followees))
                    : getProfileFollowees(currentUser.profile.profile.slug).then(followees => setProfiles(followees))
            }
        }
    }, [])

    const handleProfileClick = (e) => {
        let classList = e.target.classList

        if (classList.contains('follow-profile')) {
            return e.preventDefault();
        } else {
            dispatch({ type: 'SET_HIDE_MODAL' });
            dispatch({ type: 'CLEAR_MODAL_OPTIONS' })
        }
    }

    return (
        <div className={`text-align-center ${className}`}>
            <header className="flex flex-col bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2">
                {slug && name && avatar ? <div>
                    <div className="flex flex-col align-center">
                        <i className="w-20 h-20 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${avatar && (config.API_BASE_URL + avatar.url)})` }}></i>
                    </div>
                    <h1 className="text-orange f2 font-normal"><strong className="text-white">{name && name} </strong>{type === 'followers' ? ': followers' : ': following'}</h1>
                </div>
                    : <div className="text-align-left"><h1 className="text-orange f1 font-normal">Your Followers</h1></div>
                }
                <div className="px-1 flex justify-between align-center overflow-hidden sticky bg-dark py-3 z-index-8 mt-6" style={{ top: '195px' }}>
                    <div className="flex-1 text-align-center">
                        <span className="text-grey uppercase f6">Avatar</span>
                    </div>
                    <div className="text-white flex-1 text-align-center">
                        <span className="text-grey uppercase f6 font-normal">Profile url</span>
                    </div>
                    <div className="text-white flex-1 text-align-center">
                        <span className="text-grey uppercase f6 font-normal">Follow</span>
                    </div>
                </div>
            </header>
            {profiles.length > 0
                ? <ul className={`mt-2 ${fromModal ? 'modal-scroll-content' : 'flex flex-col'}`}>
                    {profiles.map(profile => {
                        return (
                            <NavLink onClick={handleProfileClick} to={`/profile/${profile.slug}`} key={profile.id} className="justify-between flex align-center bg-grey-dark-light my-1 py-2 px-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full hover:bg-grey-black">
                                <div className="flex-1 text-align-center flex justify-center align-center">
                                    <i className="block w-8 h-8 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${profile.avatar && (config.API_BASE_URL + profile.avatar.url)})` }}></i>
                                </div>
                                <div className="text-white flex-1 text-align-center">
                                    <span className="text-white f5 font-normal">{profile.slug}</span>
                                </div>
                                <div className="text-white flex-1 text-align-center">
                                    {currentUser.profile.profile.id !== profile.id ? <FollowProfile profile={profile} /> : <span className="f4 text-grey">you</span>}
                                </div>
                            </NavLink>
                        )
                    })}
                </ul>
                : <span className="block mt-4 text-grey f5 font-normal px-1">{name && name} has no {type === 'followers' ? 'followers' : 'following'} for now</span>
            }
        </div>
    );
};

export default ProfileCommunity;