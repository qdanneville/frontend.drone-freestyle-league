import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import config from '../../../../config'
import api from '../../utils/api'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'

import DroneIcon from '../../../assets/svg/gear-drone.svg'
import BatteryIcon from '../../../assets/svg/gear-battery.svg'
import SettingsIcon from '../../../assets/svg/settings.svg'

import CommonInput from '../../components/common/common-input'

const GearBatteryEdit = ({ edit, create }) => {

    let _isMounted = false;

    const { slug } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.auth.user);

    const [isLoading, setIsLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [addManufacturer, setAddManufacturer] = useState(false);
    const [Submitted, setSubmitted] = useState(false);
    const [deleteAsked, setDeleteAsked] = useState(false);

    //battery fields
    const [batteryId, setbatteryId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState(0);
    const [nbCells, setNbCells] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [discharge, setDischarge] = useState(0);
    const [manufacturer, setManufacturer] = useState(0);
    const [customManufacturer, setCustomManufacturer] = useState("");
    const [rating, setRating] = useState(50);
    const [vendorLink, setVendorLink] = useState("");
    const [creator, setCreator] = useState("");

    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    //Fetch existing battery
    useEffect(() => {
        _isMounted = true;

        if (slug) {
            api.get(`/batteries?slug=${slug}`)
                .then(response => {
                    let battery = response.data[0]
                    if (battery && _isMounted) {
                        setbatteryId(battery.id)
                        setName(battery.name)
                        setNbCells(battery.nb_cells)
                        setCapacity(battery.mAh)
                        setDischarge(battery.C)
                        setName(battery.name)
                        setManufacturer(battery.manufacturer.id)
                        setType(battery.battery_type.id)
                        setVendorLink(battery.vendor_link ? battery.vendor_link : '')
                        setRating(battery.rating)
                        setDescription(battery.description)
                        setCreator(battery.creator)
                        setImage(battery.image)
                    } else {
                        if (_isMounted) history.push('/gear/batteries/')
                    }

                    setIsLoading(false);
                })
                .catch(err => _isMounted && history.push('/gear/batteries/'))
        } else {
            if (_isMounted) setIsLoading(false);
        }

        return (() => {
            _isMounted = false;
        })
    }, [slug])

    //Fetch battery types
    //Fetch battery manufacturer
    useEffect(() => {
        api
            .get('/battery-types/')
            .then(response => (response && response.data && _isMounted) ? setTypes(response.data) : [])

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
            nb_cells: nbCells,
            mAh: capacity,
            C: discharge,
            battery_type: type,
            manufacturer: manufacturer,
            rating: rating,
            vendor_link: vendorLink,
            creator: creator.length > 0 ? creator : user.profile.profile.id
        }

        try {
            //Custom manufacturer added by the user
            if (customManufacturer.length > 0) {
                let newManufacturer = await api.post('/manufacturers', { name: customManufacturer })

                if (newManufacturer && newManufacturer.data && newManufacturer.data.id) {
                    body.manufacturer = newManufacturer.data.id
                }
            }

            slug
                ? await updateCreateBattery(batteryId, body, imageFile, 'update')
                : await updateCreateBattery(batteryId, body, imageFile, 'create')
        }
        catch (err) {
            setSubmitted(false);
            toast.error("Ewww, something went wrong, please try again");
        }

        setSubmitted(false);
        history.push({ pathname: "/gear/batteries/" })
        toast.success(create ? "Your battery has been successfully created" : "Your battery has been successfully updated");
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            await api.delete(`/batteries/${batteryId}`)
        }
        catch (err) {
            setSubmitted(false);
            toast.error("Ewww, something went wrong, please try again");
        }

        setSubmitted(false);
        history.push({ pathname: "/gear/batteries/" })
        toast.success("Your battery has been successfully deleted");
    }

    if (isLoading) return <Loader className="relative" />

    return <div className="w-full mb-5">
        <header className="flex flex-col w-full px-10 pb-4">
            <div className="flex justify-between align-center mb-3">
                <h1 className="text-white f4 mt-0 mb-0">{create ? 'Create a new battery' : 'Update your battery'}</h1>
            </div>
        </header>
        <div className="w-full px-10">
            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <div className="flex-1">
                        <div className="flex flex-col">
                            <label className="text-green f4 mb-2 flex align-center">Name</label>
                            <CommonInput value={name} handleChange={setName} type="text" name="name" className="" placeholder="Ministar 1500" required />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-green f4 mb-2 flex align-center">Type</label>
                            <div className="input">
                                <select className="w-full common-outline" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option>choose type</option>
                                    {
                                        types.map(type => (<option key={type.id} value={type.id}>{type.name}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-green f4 mb-2 flex align-center">Nb cells (s)</label>
                            <CommonInput value={nbCells} handleChange={setNbCells} type="number" name="nbcells" className="" placeholder="1s, 2s, 3s, 4s ..." />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-green f4 mb-2 flex align-center">Capacity (mAh)</label>
                            <CommonInput value={capacity} handleChange={setCapacity} type="number" name="capacity" className="" placeholder="1500 mAh" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-green f4 mb-2 flex align-center">Discharge rate (C)</label>
                            <CommonInput value={discharge} handleChange={setDischarge} type="number" name="discharge" className="" placeholder="120C" />
                        </div>
                        <div className="flex flex-col mt-3">
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
                        <div className="flex flex-col mt-3">
                            <label className="text-green f4 mb-2 flex align-center">Link to vendor product</label>
                            <CommonInput value={vendorLink} handleChange={setVendorLink} type="text" name="link-to-vendor" className="" placeholder="https://www.amazon..." />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-green f4 mb-2 flex align-center">Rating (0-100)</label>
                            <CommonInput value={rating} handleChange={setRating} type="range" name="rating" className="" placeholder="50" />
                        </div>
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="flex flex-col h-full">
                            <label className="text-green f4 mb-2 flex align-center">Description</label>
                            <CommonInput value={description} handleChange={setDescription} type="textarea" name="description" className="h-full" placeholder="Description of your battery here" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col h-full">
                            <label className="text-green f4 mb-2 flex align-center">Image</label>
                            <div className="bg-dark-3 flex-1 br-4">
                                <div className="flex flex-col h-full bg-grey-dark-light br-4">
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
                <div className="flex justify-end mt-4 w-full align-center">
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
    </div >
}

export default GearBatteryEdit

const updateCreateBattery = async (batteryId, body, imageFile, type) => {

    let newbattery = null

    type === 'update'
        ? newbattery = await api.put(`/batteries/${batteryId}`, body)
        : newbattery = await api.post(`/batteries/`, body)

    //If the user added/update the battery image
    if (imageFile) {
        const data = new FormData();
        data.append('files', imageFile)
        data.append('refId', newbattery.data.id);
        data.append('ref', 'battery');
        data.append('field', 'image');

        await api.post('/upload/', data, { headers: { 'content-type': `multipart/form-data`, }, })
    }

    return newbattery
}