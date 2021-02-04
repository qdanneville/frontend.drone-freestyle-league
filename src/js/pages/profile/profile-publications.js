import React from 'react'
import PublicationList from '../../components/publication/publication-list'

const ProfilePublications = ({ profile }) => {
    return (
        <>
            <div className="my-auto" style={{ width: '650px', maxWidth: '650px', minWidth: '650px' }}>
                <PublicationList profile={profile} />
            </div>
        </>
    )
}

export default ProfilePublications