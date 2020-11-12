import React from 'react'
import DflIcon from '../../assets/svg/dfl-logo';

const Loader = (props) => {
    return <div className="absolute flex w-full h-full t-0 l-0 justify-center align-center bg-dark" style={{minHeight:'300px'}}>
        <DflIcon className="loader" />
    </div>
}

export default Loader