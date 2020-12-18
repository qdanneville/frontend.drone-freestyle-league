import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import config from '../../../../config'
import api from '../../utils/api'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'

import CommonInput from '../../components/common/common-input'
import GearDroneParts from './gear-drone-parts'
import DroneBattery from '../../components/gear/drone-batteries'

import DroneIcon from '../../../assets/svg/gear-drone.svg'
import BatteryIcon from '../../../assets/svg/gear-battery.svg'
import SettingsIcon from '../../../assets/svg/settings.svg'

const GearDroneEdit = ({ edit, create }) => {

    let _isMounted = false;

    const { slug } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.auth.user);

    const [isLoading, setIsLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const [regulations, setRegulations] = useState([]);
    const [frequencies, setFrequencies] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [addManufacturer, setAddManufacturer] = useState(false);
    const [Submitted, setSubmitted] = useState(false);
    const [deleteAsked, setDeleteAsked] = useState(false);

    //drone fields
    const [droneId, setdroneId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [weight, setWeight] = useState(0);
    const [manufacturer, setManufacturer] = useState(0);
    const [customManufacturer, setCustomManufacturer] = useState("");
    const [rating, setRating] = useState(50);
    const [vendorLink, setVendorLink] = useState("");
    const [creator, setCreator] = useState("");

    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    //Drone parts
    const [droneParts, setDroneParts] = useState([]);

    //Batteries
    const [droneBatteries, setDroneBatteries] = useState([]);
    const [newDroneBatteries, setNewDroneBatteries] = useState(null);

    //Fetch existing drone
    useEffect(() => {
        _isMounted = true;

        console.log(slug);

        if (slug) {
            api.get(`/drones?slug=${slug}`)
                .then(response => {
                    let drone = response.data[0]
                    console.log(drone);
                    if (drone && _isMounted) {
                        setdroneId(drone.id ? drone.id : '')
                        setName(drone.name ? drone.name : '')
                        setWeight(drone.weight ? drone.weight : 0)
                        setManufacturer(drone.manufacturer ? drone.manufacturer.id : 0)
                        setType(drone.type ? drone.type.id : 0)
                        setVendorLink(drone.vendor_link ? drone.vendor_link : '')
                        setRating(drone.rating ? drone.rating : 50)
                        setDescription(drone.description ? drone.description : '')
                        setCreator(drone.creator ? drone.creator : '')
                        setImage(drone.image)
                        setDroneParts(drone.drone_parts.map(part => part.id))
                        setDroneBatteries(drone.batteries.map(battery => battery.id))
                    } else {
                        // if (_isMounted) history.push('/gear/drones/')
                    }

                    setIsLoading(false);
                })
            // .catch(err => _isMounted && history.push('/gear/drones/'))
        } else {
            if (_isMounted) setIsLoading(false);
        }

        return (() => {
            _isMounted = false;
        })
    }, [slug])

    //Fetch drone types
    //Fetch drone manufacturer
    //Fetch drone regulations
    useEffect(() => {
        api
            .get('/drone-types/')
            .then(response => (response && response.data && _isMounted) ? setTypes(response.data) : [])

        api
            .get('/regulations/')
            .then(response => (response && response.data && _isMounted) ? setRegulations(response.data) : [])

        api
            .get('/drone-frequencies/')
            .then(response => (response && response.data && _isMounted) ? setFrequencies(response.data) : [])

        //Addind an other category in order for the user to choose an another brand and type its custom name
        api
            .get('/manufacturers/')
            .then(response => {
                if (response && response.data && _isMounted) {
                    let manufacturers = response.data
                    if (manufacturers) manufacturers.push({ name: 'Other', id: 'other' })
                    setManufacturers(manufacturers)
                }
            })
    }, [])

    const handleClickManufacturer = (manufacturer) => {
        if (manufacturer === 'Other' || manufacturer === 'other') setAddManufacturer(true);
        else setAddManufacturer(false);
        setManufacturer(manufacturer)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const body = {
            name: name,
            description: description,
            weight: weight,
            preffered_frequency: frequency,
            type: type,
            manufacturer: manufacturer,
            rating: rating,
            vendor_link: vendorLink,
            creator: creator && creator.length > 0 ? creator : user.profile.profile.id
        }

        if (newDroneBatteries) body.batteries = newDroneBatteries

        try {
            //Custom manufacturer added by the user
            if (customManufacturer.length > 0) {
                let newManufacturer = await api.post('/manufacturers', { name: customManufacturer })

                if (newManufacturer && newManufacturer.data && newManufacturer.data.id) {
                    body.manufacturer = newManufacturer.data.id
                }
            }

            slug
                ? await updateCreateDrone(droneId, body, imageFile, 'update')
                : await updateCreateDrone(droneId, body, imageFile, 'create')
        }
        catch (err) {
            setSubmitted(false);
            toast.error("Ewww, something went wrong, please try again");
        }

        setSubmitted(false);
        history.push({ pathname: "/gear/drones/" })
        toast.success(create ? "Your drone has been successfully created" : "Your drone has been successfully updated");
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            await api.delete(`/drones/${droneId}`)
        }
        catch (err) {
            setSubmitted(false);
            toast.error("Ewww, something went wrong, please try again");
        }

        setSubmitted(false);
        history.push({ pathname: "/gear/drones/" })
        toast.success("Your drone has been successfully deleted");
    }

    if (isLoading) return <Loader className="relative" />

    return <div className="w-full mb-5 px-6">
        {/* <header className="flex flex-col w-full px-10 pb-4">
            <div className="flex justify-between align-center mb-3">
                <h1 className="text-white f4 mt-0 mb-0">{create ? 'Create a new drone' : 'Update your drone'}</h1>
            </div>
        </header> */}
        <div className="w-full flex flex-1 flex-col-md">
            <div className="w-full flex-col w-40-per w-full-md">
                <div className="br-6 flex-1 p-4 bg-grey-dark-light shadow-materiel">
                    <div className="w-full flex justify-between item-center">
                        <span className="block f4 text-white font-bold uppercase pb-6">Drone global settings</span>
                        <SettingsIcon className="w-8 h-8 fill-white" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            <div className="flex w-full flex-col">
                                <div className="flex-1">
                                    <div className="flex flex-col">
                                        <label className="text-green f4 mb-2 flex align-center">Name</label>
                                        <CommonInput value={name} handleChange={setName} type="text" name="name" className="" placeholder="Ministar 1500" required />
                                    </div>
                                    <div className="flex flex-col-md">
                                        <div className="flex flex-1 flex-col mt-3">
                                            <label className="text-green f4 mb-2 flex align-center">Size</label>
                                            <div className="input">
                                                <select className="w-full common-outline" value={type} onChange={(e) => setType(e.target.value)}>
                                                    <option>choose type</option>
                                                    {
                                                        types.map(type => (<option key={type.id} value={type.id}>{type.name}</option>))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col mt-3 mx-2 mx-0-md">
                                            <label className="text-green f4 mb-2 flex align-center">Weight (g)</label>
                                            <CommonInput className="h-full" value={weight} handleChange={setWeight} type="number" name="weight" placeholder="500g" />
                                        </div>
                                        <div className="flex flex-1 flex-col mt-3">
                                            <label className="text-green f4 mb-2 flex align-center">Prefered frequency</label>
                                            <div className="input">
                                                <select className="w-full common-outline" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                                                    <option>choose frequency</option>
                                                    {
                                                        frequencies.map(frequency => (<option key={frequency.id} value={frequency.id}>{frequency.name}</option>))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="flex flex-1 flex-col mt-3">
                                            <label className="text-green f4 mb-2 flex align-center">Vendor</label>
                                            <div className="input">
                                                <select className="w-full common-outline" value={manufacturer} onChange={(e) => handleClickManufacturer(e.target.value)}>
                                                    <option>choose manufacturer</option>
                                                    {
                                                        manufacturers.map(manufacturer => (<option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>))
                                                    }
                                                </select>
                                                {addManufacturer && <CommonInput value={customManufacturer} handleChange={setCustomManufacturer} type="text" name="manufacturer" placeholder="Fatshark" />}
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col mt-3 ml-2">
                                            <label className="text-green f4 mb-2 flex align-center">Link to vendor product</label>
                                            <CommonInput value={vendorLink} handleChange={setVendorLink} type="text" name="link-to-vendor" className="h-full" placeholder="https://www.amazon..." />
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <label className="text-green f4 mb-2 flex align-center">Rating (0-100)</label>
                                        <CommonInput value={rating} handleChange={setRating} type="range" name="rating" className="" placeholder="50" />
                                    </div>
                                </div>
                                <div className="flex mt-3">
                                    <div className="w-60-per">
                                        <div className="flex flex-col h-full">
                                            <label className="text-green f4 mb-2 flex align-center">Description</label>
                                            <CommonInput value={description} handleChange={setDescription} type="textarea" name="description" className="h-40" placeholder="Description of your drone here" />
                                        </div>
                                    </div>
                                    <div className="w-40-per flex-1 ml-2">
                                        <div className="flex flex-col h-full">
                                            <label className="text-green f4 mb-2 flex align-center">Image</label>
                                            <div className="bg-dark-3 flex-1">
                                                <div className="flex flex-col h-full bg-grey-input br-4">
                                                    {
                                                        image
                                                            ? <i className="relative flex h-full justify-center align-start w-full br-4 overflow-hidden background-image block" style={{ backgroundImage: `url(${config.API_BASE_URL + image.url})` }}></i>
                                                            : <i className="relative flex h-full justify-center align-start w-full br-4 overflow-hidden background-image block" style={{ backgroundImage: `url(${imageSrc})` }}></i>
                                                    }
                                                    <input className="common-input-file  mt-0 mb-2 overflow-hidden" id="avatar" name="avatar" type="file" placeholder="Spot image" onChange={(e) => { setImageFile(e.target.files[0]); setImageSrc(URL.createObjectURL(e.target.files[0])); setImage(null) }} />
                                                    <label className="mt-2 text-align-center mb-2 mx-2" htmlFor="avatar">Add picture</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 w-full-md align-center">
                            {!deleteAsked
                                ? <div className="flex align-center">
                                    {edit && <button onClick={() => setDeleteAsked(true)} type="button" className={`btn-secondary red`}><span>Delete</span></button>}
                                    <button className={`btn-secondary teal ml-4 ${Submitted ? 'loading' : ''}`}>{create ? 'Create' : 'Update'}</button>
                                </div>
                                : <div className="flex align-center">
                                    <button onClick={() => setDeleteAsked(false)} type="button" className={`btn-secondary red`}><span>No</span></button>
                                    <button onClick={handleDelete} type="button" className={`btn-secondary teal ml-4`}><span>Yes</span></button>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <div className="br-6 flex-1 p-4 bg-grey-dark-light shadow-materiel w-half ml-6">
                <div className="w-full flex justify-between items-center pb-6">
                    <span className="block f4 text-white font-bold uppercase">Drone parts</span>
                    <div className="flex items-center">
                        <DroneIcon className="w-6 h-6 fill-white" />
                    </div>
                </div>
                <GearDroneParts dronePartsIds={droneParts} manufacturers={manufacturers} user={user} droneId={droneId} />
            </div>
        </div>

        <div className="br-6 flex-1 p-4 bg-grey-dark-light shadow-materiel w-full mt-6">
            <div className="w-full flex justify-between items-center pb-6">
                <span className="block f4 text-white font-bold uppercase">Drone batteries</span>
                <div className="flex items-center">
                    <NavLink className="text-white f5 underline mr-3" to="/gear/batteries/">manage batteries</NavLink>
                    <BatteryIcon className="w-6 h-6 fill-white" />
                </div>
            </div>
            <DroneBattery currentBatteries={droneBatteries} handleChangeBatteries={setNewDroneBatteries} />
        </div>
    </div >
}

export default GearDroneEdit

const updateCreateDrone = async (droneId, body, imageFile, type) => {

    let newdrone = null

    type === 'update'
        ? newdrone = await api.put(`/drones/${droneId}`, body)
        : newdrone = await api.post(`/drones/`, body)

    //If the user added/update the drone image
    if (imageFile) {
        const data = new FormData();
        data.append('files', imageFile)
        data.append('refId', newdrone.data.id);
        data.append('ref', 'drone');
        data.append('field', 'image');

        await api.post('/upload/', data, { headers: { 'content-type': `multipart/form-data`, }, })
    }

    return newdrone
}