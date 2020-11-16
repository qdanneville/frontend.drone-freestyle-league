import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import config from '../../../config';

import UserLevel from './user-level'

const UserProfile = (props) => {
    const user = useSelector(state => state.auth.user)

    return (
        <div className="w-full px-5">
            { user
                ?
                <div className="flex flex-col mt-10 align-center">
                    {
                        user.profile.profile.avatar
                            ? <i className="w-20 h-20 br-50 bg-white shadow-1 mb-8 overflow-hidden bs-solid bc-white bw-2 background-image" style={{ backgroundImage: `url(${config.API_BASE_URL + user.profile.profile.avatar.url})` }}></i>
                            : <i className="w-20 h-20 br-50 bg-white shadow-1 mb-8 overflow-hidden bs-solid bc-white bw-2 bg-grey"></i>
                    }
                    <div className="flex flex-col justify-start text-white w-full">
                        <Link className="underline f7 text-grey" to="/settings">edit profile</Link>
                        <span className="font-black f45 uppercase italic my-2">{user.profile.profile.display_name}</span>
                        {user.profile.level && <UserLevel level={user.profile.level} currentPoints={user.profile.current_points} />}
                    </div>
                </div>
                : <div>loading user</div>
            }
        </div>
    )
}

export default UserProfile