import React, { useState, useEffect } from 'react'
import config from '../../../../../../config'

import HeartIcon from '../../../../../assets/svg/heart.svg';
import CloseModalIcon from '../../../../../assets/svg/close.svg';

const PublicationItem = ({ item, handleClick, handleRemove }) => {

    let image = null;

    if (item.image && item.image.formats && item.image.formats.small) {
        image = config.API_BASE_URL + item.image.formats.small.url
    } else if (item.image && item.image.url) {
        image = config.API_BASE_URL + item.image.url
    }

    const divProps = {
        onClick: handleClick ? () => handleClick(item) : null,
    }

    //TODO add UUID ...
    //We want to modify our id, because it's not unique within our system, only in its content type
    // type + id
    if (typeof item.id === 'number') item.id = item.itemType + '-' + item.id

    return (
        <div {...divProps} className={`relative w-full flex align-center h-12 bg-grey-dark-light br-4 mb-3 overflow-hidden shadow-material-2 common-outline ${handleClick ? 'hover:bg-grey-black cursor-pointer' : ''}`}>
            {handleRemove && <CloseModalIcon onClick={() => handleRemove(item.id)} className="z-index-2 absolute t-2 r-2 w-7 h-7 stroke-grey cursor-pointer bg-grey-dark-light p-2 br-50 hover:bg-dark-3 z-index-1" />}
            <i className="h-full w-20 overflow-hidden flex relative bg-grey background-image mr-4" style={{ backgroundImage: `url('${image}` }}>
            </i>
            <div className="flex flex-col text-white mr-4">
                <div className="flex items-center">
                    <span className="text-white f4 text-nowrap text-overflow-ellipsis block overflow-hidden">{item.name}</span>
                    <span className="mx-1">|</span>
                    <span className="text-green f5 font-normal">{item.type ? item.type : ''}</span>
                </div>
                <span className="text-orange f5 font-normal ">{item.customInfo ? item.customInfo : ''}</span>
            </div>
        </div>
    )
}

export default PublicationItem