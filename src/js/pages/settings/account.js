import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../store/auth'
import api from '../../utils/api'
import config from '../../../../config';
import CommonInput from '../../components/common/common-input'
import { toast } from 'react-toastify'

const UserAccount = ({ user }) => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [displayName, setDisplayName] = useState(user.profile.profile.display_name);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [passwordsRequired, setPasswordsRequired] = useState(false);
    const [passwordsMatching, setPasswordsMatching] = useState(false);
    const [contentChanged, setContentChanged] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    const [err, setErr] = useState(null);

    const profileCreationDate = new Date(user.profile.profile.created_at).toLocaleDateString('en-US')

    //Form logic
    if (!passwordsMatching && passwordsRequired && password1.length > 0 && password2.length > 0 && password1 === password2) {
        setPasswordsMatching(true)
    }

    if (passwordsMatching && passwordsRequired && (password1 !== password2 || password1.length === 0 || password2.length === 0)) {
        setPasswordsMatching(false)
    }

    if (!contentChanged && (email !== user.email || displayName !== user.profile.profile.display_name || username !== user.username || avatarSrc)) {
        setContentChanged(true);
    }

    if (contentChanged && email === user.email && displayName === user.profile.profile.display_name && username === user.username && !avatarSrc) {
        setContentChanged(false);
    }

    if (contentChanged && !passwordsRequired && !canSubmit) setCanSubmit(true);
    if (!contentChanged && !passwordsRequired && canSubmit) setCanSubmit(false);
    if (passwordsRequired && passwordsMatching && !canSubmit) setCanSubmit(true);
    if (passwordsRequired && !passwordsMatching && canSubmit) setCanSubmit(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErr(null)
        setPasswordsRequired(false);

        const body = {
            profile: {
                id: user.profile.profile.id,
                display_name: displayName
            },
            username,
            email,
        }

        //If the user wanna change his password, he must provide his current one
        if (passwordsRequired) {
            body.currentPassword = currentPassword;
            body.password = password1;
        }

        api.put(`/account/${user.id}`, body)
            .then(response => {
                if (avatarFile) {
                    const data = new FormData();

                    data.append('files', avatarFile)
                    data.append('refId', response.data.profileId);
                    data.append('ref', 'profile');
                    data.append('field', 'avatar');

                    api
                        .post('/upload/', data, {
                            headers: {
                                'content-type': `multipart/form-data`,
                            },
                        })
                        .then(response => {
                            toast.success(`Profile successfully updated`);
                            dispatch(fetchUser());
                        })
                        .catch(err => {
                            toast.info("Ewww, something went wrong  🤔");
                        })
                }
                else {
                    dispatch(fetchUser());
                    toast.success(`Profile successfully updated`);
                }
            })
            .catch(err => {
                console.log(err.response)
                setErr(err.response.data.data[0].messages[0].message)
                toast.error(`${err.response.data.data[0].messages[0].message}`);
            })
    }

    const handleChangePassword = (value, passwordType) => {

        setPasswordsRequired(true);

        switch (passwordType) {
            case 'password1':
                if (password2 === "" && currentPassword === "" && value === "") setPasswordsRequired(false);
                return setPassword1(value);
            case 'password2':
                if (password1 === "" && currentPassword === "" && value === "") setPasswordsRequired(false);
                return setPassword2(value);
            case 'currentPassword':
                if (password1 === "" && password2 === "" && value === "") setPasswordsRequired(false);
                return setCurrentPassword(value);
            default:
                return
        }
    }

    return <div className="w-full">
        <section className="common-container flex flex-col">
            {err &&
                <div className="flex align-center justify-center pt-15">
                    <span className="text-red font-bold f4">{err}</span>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="flex w-full justify-between align-center my-6">
                    <h4 className="f3 text-white font-bold my-0">Account</h4>
                    <span className="text-grey f5 my-1">Member since  <strong className="text-white font-bold">{profileCreationDate}</strong></span>
                </div>
                <div className="flex">
                    <div className="w-half flex align-center">
                        {
                            !avatarSrc ? <i className="w-20 h-20 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${user.profile.profile.avatar && (config.API_BASE_URL + user.profile.profile.avatar.url)})` }}></i>
                                : <i className="w-20 h-20 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image" style={{ backgroundImage: `url(${avatarSrc})` }}></i>
                        }
                        <input className="common-input-file overflow-hidden" type="file" id="avatar" name="avatar" placeholder="Avatar file" onChange={(e) => { setAvatarFile(e.target.files[0]); setAvatarSrc(URL.createObjectURL(e.target.files[0])) }} />
                        <label className="ml-2" htmlFor="avatar">Choose a file</label>
                    </div>
                    <div className="w-half flex flex-col ml-1">
                        <label className="text-grey-light f4 mb-2 flex align-center">Displayed name <strong className="text-grey f5 font-normal ml-1">(What other pilot or brand sees)</strong></label>
                        <CommonInput value={displayName} handleChange={setDisplayName} type="text" name="displayName" className="" placeholder="Display name" required />
                    </div>
                </div>
                <div className="w-full flex mt-8">
                    <div className="flex flex-col mb-3 w-half mr-1">
                        <label className="text-grey-light f4 mb-2 flex align-center">Username <strong className="text-grey f5 font-normal ml-1">(Can be used to log in)</strong></label>
                        <CommonInput value={username} handleChange={setUsername} type="text" name="username" className="" placeholder="Username" required />
                    </div>
                    <div className="flex flex-col mb-3 w-half ml-1">
                        <label className="text-grey-light f4 mb-2 flex align-center">Email <strong className="text-grey f5 font-normal ml-1">(Can be used to log in)</strong></label>
                        <CommonInput value={email} handleChange={setEmail} type="email" name="email" className="" placeholder="Email" required />
                    </div>
                </div>
                <i className="my-10 block bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full"></i>
                <h4 className="f3 text-white font-bold mt-0 mb-1">Password settings</h4>
                <span className="f6 text-grey font-normal">* Those fields are optionnal as long as they remain empty</span>
                <div className="w-full flex mt-6">
                    <div className="flex flex-col mb-3 w-full">
                        <label className="text-grey-light f4 mb-2">Current password {passwordsRequired && <strong className="text-grey f5 font-normal ml-1">Required</strong>}</label>
                        <CommonInput required={passwordsRequired} value={currentPassword} handleChange={(value) => handleChangePassword(value, 'currentPassword')} type="password" name="currentPassword" className="" placeholder="**********" />
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="flex flex-col mb-3 w-half mr-1">
                        <label className="text-grey-light f4 mb-2">Change password {passwordsRequired && <strong className="text-grey f5 font-normal ml-1">Required</strong>}</label>
                        <CommonInput required={passwordsRequired} value={password1} handleChange={(value) => handleChangePassword(value, 'password1')} type="password" name="password1" className="" placeholder="**********" />
                    </div>
                    <div className="flex flex-col mb-3 w-half ml-1">
                        <label className="text-grey-light f4 mb-2">Validate password {passwordsRequired && <strong className="text-grey f5 font-normal ml-1">Required</strong>}</label>
                        <CommonInput required={passwordsRequired} value={password2} handleChange={(value) => handleChangePassword(value, 'password2')} type="password" name="password2" className="" placeholder="**********" />
                    </div>
                </div>
                <i className="my-10 block bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full"></i>
                <div className="flex justify-end">
                    <button disabled={!canSubmit} className={`btn-secondary teal ${!canSubmit && 'disabled'}`}>Update</button>
                </div>
            </form>
        </section>
    </div >
}

export default UserAccount