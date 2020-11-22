import React from 'react'
import { useHistory } from "react-router-dom";
import BackIcon from '../../assets/svg/back.svg'

const BackButton = (props) => {
    const history = useHistory();

    return <div className="flex">
        <span tabIndex="0" className="text-grey-light underline cursor-pointer flex align-center common-outline p-2" onClick={() => history.goBack()}>
            <BackIcon className="w-4 h-4 fill-white" />
            {`back`}
        </span>
    </div>
}

export default BackButton