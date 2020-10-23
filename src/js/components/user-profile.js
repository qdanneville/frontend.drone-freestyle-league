import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearToken } from '../utils/local-storage'
import { clearAuth } from '../utils/api'

const user = null

const UserProfile = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    const signout = () => {
        clearToken();

        dispatch({
            type: 'CLEAR_AUTH_USER'
        })

        dispatch({
            type: 'CLEAR_AUTH_TOKEN'
        })

        clearAuth();

        history.replace({ pathname: "/login" })
    }

    return (
        <div>
            { user
                ?
                <div className="flex flex-col justify-center items-center mt-10">
                    <i className="w-20 h-20 br-50 bg-white shadow-1"></i>
                    <div className="flex flex-col ml-2 items-center justify-center text-white">
                        <span className="font-bold f4 my-2">{user.username}</span>
                        <span className="font-bold f4 my-2">{user.role.name}</span>
                        <a className="underline f6 mt-1 cursor-pointer" onClick={signout}>Sign out</a>
                    </div>
                </div>
                : <div>loading user</div>
            }
        </div>
    )
}

export default UserProfile