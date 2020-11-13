import React, { useState, useEffect } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'

import api from '../../utils/api'

import Loader from '../../components/loader'
import EditIcon from '../../../assets/svg/edit.svg';

const SpotDetails = (props) => {


    const { slug } = useParams();
    const history = useHistory();
    const [spot, setSpot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        api.get(`spots/${slug}`)
            .then(response => {
                if (response.data) setSpot(response.data)
                setIsLoading(false);
            })
            .catch(err => history.push('/spots/'))
    }, [])


    return (
        <div className="w-full">
            {isLoading ? <span>loading</span>
                :
                <div>
                    <header className="flex flex-col w-full px-10 pb-4 bb-w-1 bl-w-0 br-w-0 bt-w-0 bs-solid bc-dark-light-2 w-full">
                        <div className="flex justify-between align-center mb-3 w-full">
                            <h1 className="text-yellow good-times f2 my-0">Spot : <strong className="roboto text-white">{spot.name}</strong></h1>
                            {spot.canEdit && <Link to={`/spots/${slug}/edit/`} className="text-dark fill-dark f4 flex justify-center align-center bg-grey-light hover:bg-grey py-2 px-4 br-4 cursor-pointer"> <EditIcon className="stroke-15 w-4 h-4 mr-3" />Edit spot</Link>}
                        </div>
                    </header>

                    <span>{spot.description}</span>
                </div>
            }
        </div>
    )
}

export default SpotDetails;