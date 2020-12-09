import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CommonInput from '../../../components/common/common-input'
import api from '../../../utils/api'
import config from '../../../../../config'
import FollowProfile from '../../../components/profile/follow-profile'

const SearchProfile = () => {

    const [search, setSearch] = useState('')
    const [profiles, setProfiles] = useState([])
    const currentUser = useSelector(state => state.auth.user)

    useEffect(() => {
        if (search !== "") {
            api.get(`profiles?_where[_or][0][display_name_contains]=${search}&_where[_or][1][user.username_contains]=${search}&_where[_or][2][fullname_contains]=${search}`)
                .then(response => setProfiles(response.data))
        } else setProfiles([])

    }, [search])

    const handleProfileClick = (e) => {
        let classList = e.target.classList

        if (classList.contains('follow-profile')) {
            return e.preventDefault();
        }
    }

    return (
        <div>
            <header className="flex flex-col bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2">
                <h1 className="text-orange f1 font-normal">Search a profile</h1>
                <div className="w-full mt-4">
                    <CommonInput value={search} handleChange={setSearch} type="text" name="search" className="search" placeholder="Search profile..." icon="search" />
                </div>
                <div className="px-1 flex justify-center align-center overflow-hidden sticky bg-dark py-3 z-index-8 mt-6" style={{ top: '195px' }}>
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
                ? <ul className="flex flex-col mt-2">
                    {profiles.map(profile => {
                        return (
                            <Link onClick={handleProfileClick} to={`/profile/${profile.slug}`} key={profile.id} className="flex justify-center align-center bg-grey-dark-light my-1 py-2 px-2 flex align-center br-10 overflow-hidden shadow-material-2 w-full">
                                <div className="flex-1 text-align-center">
                                    <i className="ml-3 block w-8 h-8 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${profile.avatar && (config.API_BASE_URL + profile.avatar.url)})` }}></i>
                                </div>
                                <div className="text-white flex-1 text-align-center">
                                    <span className="text-white f5 font-normal">{profile.slug}</span>
                                </div>
                                <div className="text-white flex-1 text-align-center">
                                    {currentUser.profile.profile.id !== profile.id ? <FollowProfile profile={profile} /> : <span className="f4 text-grey">you</span>}
                                </div>
                            </Link>
                        )
                    })}
                </ul>
                : <span className="block mt-4 text-grey f5 font-normal px-1">No match found</span>
            }
        </div>
    );
};

export default SearchProfile;