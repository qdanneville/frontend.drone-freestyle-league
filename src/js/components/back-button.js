import React from 'react'
import { useHistory } from "react-router-dom";
import BackIcon from '../../assets/svg/back.svg'

const BackButton = (props) => {
    const history = useHistory();

    return <span className="text-grey-light underline cursor-pointer flex align-center" onClick={() => history.goBack()}>
        <BackIcon className="w-4 h-4 fill-white" />
        {`back`}
    </span>
}

export default BackButton