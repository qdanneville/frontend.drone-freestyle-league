import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import config from '../../../../config'

import BackButton from '../../components/back-button'

import ProfileBackgroundImg from '../../../assets/profile-background.jpg'
import BasicInformations from '../../components/profile/basic-profile-informations'
import FollowProfile from '../../components/profile/follow-profile'
import UserLevel from '../../components/user-level'

import DroneIcon from '../../../assets/svg/airvuz-logo.svg'
import WebsiteIcon from '../../../assets/svg/website.svg'
import InstagramIcon from '../../../assets/svg/logo-instagram.svg'
import YoutubeIcon from '../../../assets/svg/logo-youtube.svg'

const ProfileInformations = ({ profile }) => {

    const [update, setUpdate] = useState(false)
    const currentUser = useSelector(state => state.auth.user)
    const profileCreationDate = profile ? new Date(profile.created_at).toLocaleDateString('en-US') : null

    return (
        <div className="w-full">
            <header className="flex flex-col w-full px-10 pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full sticky t-0 z-index-7 bg-dark pt-10">
                <BackButton />
                <div className="flex justify-between align-center mb-3 w-full">
                </div>
            </header>
            <div className="flex common-container">
                <div className="flex flex-col align-center w-full">
                    <div className="relative spot-image flex justify-center align-start w-full br-10 box-shadow-1 overflow-hidden background-image block bg-dark-light" style={{ backgroundImage: `url(${ProfileBackgroundImg})` }}>
                        <BasicInformations profile={profile} update={update} className="absolute l-4 b-3 display-none-md" />
                        {currentUser.profile.profile.id !== profile.id && <FollowProfile profile={profile} className="absolute b-5 r-3" handleUpdate={() => setUpdate(!update)} />}
                    </div>
                    <div className="z-index-1 flex flex-col justify-center align-center text-align-center py-4 px-10 bg-dark br-10" style={{ marginTop: '-200px' }}>
                        <div className="flex flex-col align-center">
                            <i className="w-20 h-20 br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image bg-grey" style={{ backgroundImage: `url(${profile.avatar && (config.API_BASE_URL + profile.avatar.url)})` }}></i>
                        </div>
                        <div className="flex flex-col align-center mt-2">
                            <span className="text-grey f3 uppercase mb-1"><strong className="text-white font-bold">{profile.display_name}</strong></span>
                            <span className="text-grey f4 uppercase mb-4 lowercase">@{profile.slug}</span>
                            <UserLevel level={profile.type.level} currentPoints={profile.type.current_points} displayFirst={'level'} />
                            <span className="text-grey f4 my-1">Member since  <strong className="text-white font-bold">{profileCreationDate ? profileCreationDate : 'Unknown'}</strong></span>
                            <ul className="flex justify-evenly w-40 mt-4">
                                {profile.website &&
                                    <li className="flex align-center">
                                        <a href={profile.website} target="_blank" rel="no-referer"><WebsiteIcon className="w-4 h-4 fill-grey" /></a>
                                    </li>
                                }
                                {profile.instagram_account &&
                                    <li className="flex align-center">
                                        <a href={profile.instagram_account} target="_blank" rel="no-referer"><InstagramIcon className="w-4 h-4 fill-grey" /></a>
                                    </li>
                                }
                                {profile.youtube_channel &&
                                    <li className="flex align-center">
                                        <a href={profile.youtube_channel} target="_blank" rel="no-referer"><YoutubeIcon className="w-4 h-4 fill-grey" /></a>
                                    </li>
                                }
                                {profile.airvuz_account &&
                                    <li className="flex align-center">
                                        <a href={profile.airvuz_account} target="_blank" rel="no-referer"><DroneIcon className="w-4 h-4 fill-grey" /></a>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                    <BasicInformations profile={profile} className="relative display-none block-md" />
                    <i className="mt-10 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full"></i>
                </div>
            </div>
        </div>
    )
}

export default ProfileInformations