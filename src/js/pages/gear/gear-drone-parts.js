import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../utils/api'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'

import DronePartItem from '../../components/gear/drone-part-item'

const GearDroneParts = ({ droneId, dronePartsIds, manufacturers, user }) => {

    let _isMounted = false;

    const history = useHistory();
    const [droneParts, setDroneParts] = useState([]);
    const [partTypes, setPartTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (history.location.state && history.location.state.create) toast.success("Your drone has been successfully created");
        else if (history.location.state && history.location.state.delete) toast.success("Your drone has been successfully deleted");
    }, [])

    useEffect(() => {
        _isMounted = true;

        //Building our API call to retrieve all drone parts of a specific drone
        let params = '?'

        if (dronePartsIds.length > 0) {

            dronePartsIds.forEach((id, i) => {
                if (i !== 0) params += `&`
                params += `_where[_or][0][id]=${id}`
            });

            api.get(`/drone-parts/${params}`)
                .then((response => _isMounted && setDroneParts(response.data)))
                .finally(() => _isMounted && setIsLoading(false))
        } else {
            if (_isMounted) setIsLoading(false)
        }

        return (() => {
            _isMounted = false;
        })
    }, [])

    useEffect(() => {
        api.get('/drone-parts-types/')
            .then(response => _isMounted && setPartTypes(response.data))
    }, [])

    if (isLoading) return <Loader className="relative" />

    return <div className="w-full">
        <label className="text-green f4 mb-2 flex align-center">What's inside your drone : </label>
        <div className="flex align-center overflow-hidden sticky bg-dark py-3 z-index-8" style={{ top: '195px' }}>
            <div className="w-20 mr-4">
                <span className="text-grey uppercase f6">Image</span>
            </div>
            <div className="text-white mr-4 w-30">
                <span className="text-grey uppercase f6 font-normal">Name</span>
            </div>
            <div className="flex align-center justify-between flex-1">
                <div className="flex align-center justify-center px-2 w-30">
                    <span className="text-grey uppercase f6 font-normal">type</span>
                </div>
                <div className="flex align-center justify-center w-30">
                    <span className="text-grey uppercase f6 font-normal text-align-center">Constructor</span>
                </div>
                <div className="flex align-center justify-center px-2 w-20">
                    <span className="text-grey uppercase f6 font-normal">price</span>
                </div>
                <div className="flex flex-col justify-center align-center fill-grey py-2 px-2 w-40">
                    <span className="text-grey uppercase f6 font-normal text-align-center">Link to vendor</span>
                </div>
                <div className="flex align-center justify-center w-20">
                    <span className="text-grey uppercase f6 font-normal mr-2">Rating</span>
                </div>
                <div className="flex align-center w-20 h-full justify-end pr-4">
                    <span className="text-grey uppercase f6 font-normal">Edit</span>
                </div>
            </div>
        </div>
        <ul>
            {
                droneParts.length > 0
                    ? droneParts.map(dronePart => <DronePartItem key={dronePart.id} dronePart={dronePart} manufacturers={manufacturers} partTypes={partTypes} user={user} />)
                    : <span className="text-white font-normal f4 mb-3 block">This drone seems to be an empty shell</span>
            }
            {/* //Last is for creation */}
            <DronePartItem create={true} dronePart={{}} manufacturers={manufacturers} partTypes={partTypes} user={user} droneId={droneId} />
        </ul>
    </div>
}

export default GearDroneParts