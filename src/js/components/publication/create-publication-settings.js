import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CommonInput from '../common/common-input'

import config from '../../../../config'
import TriangleDownIcon from '../../../assets/svg/bottom-triangle.svg'

const CreatePublicationSettings = () => {

    const user = useSelector(state => state.auth.user);
    const [body, setBody] = useState('');

    return (
        <div>
            <header className="bb-w-1 bl-w-0 bt-w-0 br-w-0 bc-grey-dark-light w-full bs-solid flex items-center justify-center">
                <h4 className="f3 text-grey-light mb-0 -mt-4 pt-3 pb-4">Create a publication</h4>
            </header>
            <main className="py-4 flex flex-col">
                <div className="flex items-center w-full">
                    <div className="flex">
                        {
                            user.profile.profile.avatar
                                ? <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image" style={{ backgroundImage: `url(${config.API_BASE_URL + user.profile.profile.avatar.url})` }}></i>
                                : <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 bg-grey"></i>
                        }
                    </div>
                    <div className="flex flex-col ml-2">
                        <span className="text-grey-light f4 font-bold mb-1">{user.username}</span>
                        <span className="text-grey-light f5 bg-grey-dark-light py-1 px-2 br-4 flex items-center cursor-pointer">Public <TriangleDownIcon className="w-3 h-3 fill-white" /></span>
                    </div>
                </div>
                <div className="mt-4">
                    <CommonInput value={body} handleChange={setBody} type="textarea" name="description" className="h-40 bg-transparent br-6" placeholder="What do you want to say" />
                </div>
            </main>
            <footer className="flex items-center justify-center">
             <button className="btn">Publish</button>
            </footer>
        </div>
    )
}

export default CreatePublicationSettings