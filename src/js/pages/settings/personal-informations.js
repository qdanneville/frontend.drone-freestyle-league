import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../store/auth'
import api from '../../utils/api'
import CommonInput from '../../components/common/common-input'
import { toast } from 'react-toastify'

import DroneIcon from '../../../assets/svg/airvuz-logo.svg'
import WebsiteIcon from '../../../assets/svg/website.svg'
import InstagramIcon from '../../../assets/svg/logo-instagram.svg'
import YoutubeIcon from '../../../assets/svg/logo-youtube.svg'

const UserPersonalInformation = ({ user }) => {

    const userProfile = user.profile.profile;
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState(userProfile.fullname ? userProfile.fullname : '');
    const [country, setCountry] = useState(userProfile.country ? userProfile.country : '');
    const [city, setCity] = useState(userProfile.city ? userProfile.city : '');
    const [birthDate, setBirthDate] = useState(userProfile.birth_date ? userProfile.birth_date : '');
    const [website, setWebsite] = useState(userProfile.website ? userProfile.website : '');
    const [youtubeChannel, setYoutubeChannel] = useState(userProfile.youtube_channel ? userProfile.youtube_channel : '');
    const [instragramAccount, setInstragramAccount] = useState(userProfile.instagram_account ? userProfile.instagram_account : '');
    const [airvuzAccount, setAirvuzAccount] = useState(userProfile.airvuz_account ? userProfile.airvuz_account : '');

    const [contentChanged, setContentChanged] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [err, setErr] = useState(null);

    const profileCreationDate = new Date(user.profile.profile.created_at).toLocaleDateString('en-US')

    if (!contentChanged && (fullName !== userProfile.fullname || country !== userProfile.country || city !== userProfile.city || birthDate !== userProfile.birth_date || website !== userProfile.website || youtubeChannel !== userProfile.youtube_channel || instragramAccount !== userProfile.instagram_account || airvuzAccount !== userProfile.airvuz_account)) {
        setContentChanged(true);
    }

    if (contentChanged && fullName === userProfile.fullname && country === userProfile.country && city === userProfile.city && birthDate === userProfile.birth_date && website === userProfile.website && youtubeChannel === userProfile.youtube_channel && instragramAccount === userProfile.instagram_account && airvuzAccount === userProfile.airvuz_account) {
        setContentChanged(false);
    }

    if (contentChanged && !canSubmit) setCanSubmit(true);
    if (!contentChanged && canSubmit) setCanSubmit(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            fullname: fullName,
            country,
            city,
            website,
            birth_date: birthDate,
            youtube_channel: youtubeChannel,
            instagram_account: instragramAccount,
            airvuz_account: airvuzAccount,
        }

        api.put(`/profiles/${userProfile.id}`, body)
            .then(response => {
                toast.success(`Profile successfully updated`);
                dispatch(fetchUser());
            })
            .catch(err => {
                console.log(err);
                toast.info("Ewww, something went wrong  🤔");
            });

    }

    return (
        <div className="w-full">
            <section className="common-container flex flex-col">
                {err &&
                    <div className="flex align-center justify-center pt-15">
                        <span className="text-red font-bold f4">{err}</span>
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full justify-between align-center my-6">
                        <h4 className="f3 text-white font-bold my-0">Personal informations</h4>
                        <span className="text-grey f5 my-1">Member since  <strong className="text-white font-bold">{profileCreationDate}</strong></span>
                    </div>
                    <div className="flex">
                        <div className="w-half flex flex-col mr-1">
                            <label className="text-grey-light f4 mb-2 flex align-center">Full name</label>
                            <CommonInput value={fullName} handleChange={setFullName} type="text" name="displayName" className="" placeholder="John doe" />
                        </div>
                        <div className="w-half flex flex-col ml-1">
                            <label className="text-grey-light f4 mb-2 flex align-center">Birth date</label>
                            <CommonInput value={birthDate} handleChange={setBirthDate} type="date" name="birthdate" className="" placeholder="10/10/20" />
                        </div>
                    </div>
                    <div className="w-full flex mt-8">

                        <div className="w-half flex flex-col mr-1">
                            <label className="text-grey-light f4 mb-2 flex align-center">Country</label>
                            <CommonInput value={country} handleChange={setCountry} type="text" name="country" className="" placeholder="France" />
                        </div>
                        <div className="w-half flex flex-col ml-1">
                            <label className="text-grey-light f4 mb-2 flex align-center">City</label>
                            <CommonInput value={city} handleChange={setCity} type="text" name="city" className="" placeholder="Paris" />
                        </div>
                    </div>
                    <i className="my-10 block bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full"></i>
                    <h4 className="f3 text-white font-bold mt-0 mb-1">Social media (links)</h4>
                    <div className="w-full flex mt-8">
                        <div className="w-half flex flex-col mr-1">
                            <label className="text-grey-light f4 mb-2 flex align-center"><WebsiteIcon className="w-4 h-4 fill-white mr-2 strok-1" />  Website</label>
                            <CommonInput value={website} handleChange={setWebsite} type="text" name="website" className="" placeholder="https://example.com" />
                        </div>
                        <div className="w-half flex flex-col ml-1">
                            <label className="text-grey-light f4 mb-2 flex align-center"><YoutubeIcon className="w-4 h-4 fill-white mr-2 strok-1" />  Youtube channel</label>
                            <CommonInput value={youtubeChannel} handleChange={setYoutubeChannel} type="text" name="youtube" className="" placeholder="https://youtube.com/example" />
                        </div>
                    </div>
                    <div className="w-full flex mt-8">
                        <div className="w-half flex flex-col mr-1">
                            <label className="text-grey-light f4 mb-2 flex align-center"><InstagramIcon className="w-4 h-4 fill-white mr-2 strok-1" />  Instagram account</label>
                            <CommonInput value={instragramAccount} handleChange={setInstragramAccount} type="text" name="instagram" className="" placeholder="https://instagram.com/example" />
                        </div>
                        <div className="w-half flex flex-col ml-1">
                            <label className="text-grey-light f4 mb-2 flex align-center"><DroneIcon className="w-4 h-4 fill-white mr-2 strok-15" />  Airvuz account</label>
                            <CommonInput value={airvuzAccount} handleChange={setAirvuzAccount} type="text" name="airvuz" className="" placeholder="https://airvuz.com/example" />
                        </div>
                    </div>
                    <i className="my-10 block bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full"></i>
                    <div className="flex justify-end">
                        <button disabled={!canSubmit} className={`btn-secondary teal ${!canSubmit && 'disabled'}`}>Update</button>
                    </div>
                </form>
            </section>
        </div >
    )
}

export default UserPersonalInformation