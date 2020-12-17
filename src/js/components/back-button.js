import React from 'react'
import { useHistory } from "react-router-dom";
import BackIcon from '../../assets/svg/arrow-w.svg'

const BackButton = (props) => {
    const history = useHistory();

    return <div className="flex">
        <span tabIndex="0" className="back-button bg-grey-black px-4 py-2 br-4 text-grey-light underline cursor-pointer flex align-center common-outline p-2" onClick={() => history.goBack()}>
            <BackIcon className="w-4 h-4 fill-white" />
        </span>
    </div>
}

export default BackButton