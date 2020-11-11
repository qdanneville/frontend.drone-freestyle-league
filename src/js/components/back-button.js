import React from 'react'
import { useHistory } from "react-router-dom";

const BackButton = (props) => {
    const history = useHistory();

    return <span className="text-grey-light underline cursor-pointer" onClick={() => history.goBack()}>{`back`}</span>
}

export default BackButton