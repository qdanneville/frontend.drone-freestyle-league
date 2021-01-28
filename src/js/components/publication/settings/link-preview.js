import React from 'react'

const LinkPreview = ({ preview }) => {
    return (
        <div className="flex flex-col w-full">
            <i className="background-image w-full h-40 relative" style={{ backgroundImage: `url(${preview && preview.images && preview.images[0]})`, height: '230px' }}></i>
            <div className="flex flex-col bg-dark-light w-full p-4">
                <span className="f5 text-grey uppercase text-overflow-ellipsis overflow-hidden text-nowrap">{preview && preview.siteName && preview.siteName}</span>
                <span className="f4 my-1 font-bold text-grey-light text-overflow-ellipsis overflow-hidden text-nowrap">{preview && preview.title && preview.title}</span>
                <span className="f5 text-grey text-overflow-ellipsis overflow-hidden text-nowrap">{preview && preview.description && preview.description}</span>
            </div>
        </div>
    )
}

export default LinkPreview