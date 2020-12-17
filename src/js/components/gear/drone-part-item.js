import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../../../config';
import api from '../../utils/api'

import CommonInput from '../common/common-input'

import EditIcon from '../../../assets/svg/edit.svg';
import DeleteIcon from '../../../assets/svg/delete.svg';
import CloseIcon from '../../../assets/svg/close.svg';
import CheckIcon from '../../../assets/svg/check.svg';


const DroneItem = ({ droneId, dronePart, manufacturers, partTypes, user, create, update, handleUpdate }) => {

    const history = useHistory();

    const [editMode, setEditMode] = useState(create ? true : false)
    const [addManufacturer, setAddManufacturer] = useState(false);
    const [Submitted, setSubmitted] = useState(false);
    const [deleteAsked, setDeleteAsked] = useState(false);
    const [typeAsked, setTypeAsked] = useState(false);

    //DronePart fields
    const [dronePartId, setDronePartId] = useState(dronePart.id);
    const [name, setName] = useState(dronePart.name ? dronePart.name : '');
    const [description, setDescription] = useState(dronePart.description ? dronePart.description : '');
    const [type, setType] = useState(dronePart.drone_parts_type ? dronePart.drone_parts_type.id : 0);
    const [price, setPrice] = useState(dronePart.price ? dronePart.price : '');
    const [manufacturer, setManufacturer] = useState(dronePart.manufacturer ? dronePart.manufacturer.id : 0);
    const [customManufacturer, setCustomManufacturer] = useState("");
    const [rating, setRating] = useState(dronePart.rating === 0 ? dronePart.rating : dronePart.rating ? dronePart.rating : 50);
    const [vendorLink, setVendorLink] = useState(dronePart.vendor_link ? dronePart.vendor_link : '');
    const [creator, setCreator] = useState(dronePart.creator);

    const [image, setImage] = useState(dronePart.image ? dronePart.image : null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

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
            price: price,
            drone_parts_type: typeAsked ? (type === 0 ? 1 : type) : type,
            manufacturer: manufacturer,
            rating: rating,
            vendor_link: vendorLink,
            creator: creator ? creator : user.profile.profile.id
        }

        //Adding the drone id if we're creating a new drone part to add this part to the right drone :)
        let slug = null

        if (create && droneId) {
            body.droneId = droneId
        } else if (create && !droneId) {
            //We must create a draft drone to add this drone part to it

            let newDrone = await api.post(`/drones/`, { name: 'draft', creator: user.profile.profile.id })
            if (newDrone && newDrone.data) {
                body.droneId = newDrone.data.id
                slug = newDrone.data.slug
            }
            else {
                setSubmitted(false);
                return toast.error("Ewww, something went wrong, please try again");
            }
        }

        try {
            //Custom manufacturer added by the user
            if (customManufacturer.length > 0) {
                let newManufacturer = await api.post('/manufacturers', { name: customManufacturer })

                if (newManufacturer && newManufacturer.data && newManufacturer.data.id) {
                    body.manufacturer = newManufacturer.data.id
                }
            }

            !create
                ? await updateCreateDronePart(dronePartId, body, imageFile, 'update')
                : await updateCreateDronePart(dronePartId, body, imageFile, 'create')
        }
        catch (err) {
            setSubmitted(false);
            toast.error("Ewww, something went wrong, please try again");
        }

        if (create && !droneId) {
            history.push({
                pathname: `/gear/drones/${slug}/edit`,
                state: {
                    create: true,
                }
            })
        } else if (create) {
            history.push({
                pathname: history.location.pathname,
                state: {
                    create: true,
                }
            })
        }
        else {
            setSubmitted(false);
            setEditMode(false);
            toast.success("Your drone has been successfully updated");
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            await api.delete(`/drone-parts/${dronePartId}`)
        }
        catch (err) {
            setSubmitted(false);
            toast.error("Ewww, something went wrong, please try again");
        }

        setSubmitted(false);
        history.push({
            pathname: history.location.pathname,
            state: {
                delete: true
            }
        })
    }

    return (
        <form className="relative flex align-center h-12 bg-grey-dark-light br-4 mb-3 overflow-hidden hover:bg-grey-black shadow-material-2 common-outline" onSubmit={handleSubmit}>
            <div className="w-20 mr-4 h-full flex">
                <div className={`${editMode && 'hover:set-display'} relative h-full w-full overflow-hidden flex relative bg-grey background-image`} style={{ backgroundImage: `url(${image ? config.API_BASE_URL + image.url : imageSrc})` }}>
                    <div className="absolute transform-center hover:display">
                        <input className="common-input-file  mt-0 mb-2 overflow-hidden" id={`drone-part-image-${dronePartId}`} name={`drone-part-image-${dronePartId}`} type="file" placeholder="Spot image" onChange={(e) => { URL.revokeObjectURL(imageSrc); setImageFile(e.target.files[0]); setImageSrc(URL.createObjectURL(e.target.files[0])); setImage(null) }} />
                        <label tabIndex="0" className="common-outline text-align-center f6 flex align-center justify-center" htmlFor={`drone-part-image-${dronePartId}`}><EditIcon className="fill-grey w-4 h-4 cursor-pointer" /></label>
                    </div>
                </div>
            </div>
            <div className="text-white mr-4 w-30">
                {!editMode
                    ? <span className="text-white f5 italic text-nowrap text-overflow-ellipsis block overflow-hidden">{name}</span>
                    : <div className="flex flex-col">
                        <CommonInput value={name} handleChange={setName} type="text" name="name" className="f6" placeholder="Ministar 1500" required />
                    </div>
                }
            </div>
            <div className="flex align-center justify-between flex-1">
                <div className="flex align-center justify-center px-2 w-30">
                    {!editMode
                        ? <span className="text-green f6 text-align-center font-normal uppercase">{type && partTypes.find(el => el.id === parseInt(type)) ? partTypes.find(el => el.id === parseInt(type)).name : '...'}</span>
                        : <div className="flex flex-1 flex-col">
                            <div className="input">
                                <select className="w-full common-outline" style={{ fontSize: '0.75rem' }} value={type} onClick={() => setTypeAsked(true)} onChange={(e) => setType(e.target.value)}>
                                    <option>choose type</option>
                                    {
                                        partTypes.map(partType => (<option key={partType.id} value={partType.id}>{partType.name}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                    }
                </div>
                <div className="flex align-center justify-center w-30">
                    {!editMode
                        ? <span className="text-grey-light f4 font-normal text-orange text-align-center">{manufacturer ? manufacturers.find(el => el.id === parseInt(manufacturer)).name : '...'}</span>
                        : <div className="flex flex-1 flex-col">
                            <div className="input">
                                <select className="w-full common-outline" style={{ fontSize: '0.75rem' }} value={manufacturer} onChange={(e) => handleClickManufacturer(e.target.value)}>
                                    <option>choose manufacturer</option>
                                    {
                                        manufacturers.map(manufacturer => (<option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>))
                                    }
                                </select>
                                {addManufacturer && <CommonInput value={customManufacturer} handleChange={setCustomManufacturer} type="text" name="manufacturer" placeholder="Fatshark" />}
                            </div>
                        </div>
                    }
                </div>
                <div className="flex align-center justify-center px-2 w-20">
                    {!editMode
                        ? <span className="text-green f5 font-normal uppercase">{price ? price + ' €' : '...'}</span>
                        : <div className="flex flex-col">
                            <CommonInput value={price} handleChange={setPrice} type="number" name="price" className="f6" placeholder="19,99 €" />
                        </div>
                    }
                </div>
                <div className="flex flex-col justify-center align-center fill-grey py-2 px-2 w-40">

                    {!editMode
                        ? vendorLink
                            ? <a href={vendorLink} target="_blank" rel="no-referrer" className="bg-orange f5 text-dark px-4 py-2 br-4">link to vendor</a>
                            : <span className="text-grey uppercase f6 font-normal">no data</span>

                        : <div className="flex flex-col">
                            <CommonInput value={vendorLink} handleChange={setVendorLink} type="text" name="vendorLink" className="f6" placeholder="https://amazon.." />
                        </div>
                    }
                </div>
                <div className="flex align-center justify-center w-20">
                    <div className="bg-grey-dark w-full h-3 relative br-50 overflow-hidden flex align-center justify-start px-1">
                        {
                            !editMode
                                ? <span className="bg-pink h-2 br-50" style={{ width: ((rating / 100) * 100) + '%' }}></span>
                                : <div className="flex flex-col">
                                    <CommonInput value={rating} handleChange={setRating} type="range" name="rating" className="" placeholder="50" />
                                </div>
                        }
                    </div>
                </div>
                <div className={`flex align-center w-20 h-full justify-end ${create ? 'pr-2' : 'pr-4'}`}>
                    {
                        !create
                            ? !editMode
                                ? <div className="flex align-center">
                                    <DeleteIcon onClick={() => setDeleteAsked(true)} className="fill-grey w-4 h-4 cursor-pointer" />
                                    <EditIcon onClick={() => setEditMode(true)} className="fill-grey w-4 h-4 cursor-pointer ml-3" />
                                </div>
                                : <div className="flex align-center">
                                    <CheckIcon onClick={(e) => handleSubmit(e, "update")} className="fill-green w-4 h-4 cursor-pointer stroke-15" />
                                    <CloseIcon onClick={() => setEditMode(false)} className="stroke-red w-4 h-4 cursor-pointer stroke-15 ml-3" />
                                </div>
                            : <button className="btn-secondary px-1 teal">create</button>
                    }
                </div>
            </div>
            { deleteAsked &&
                <div className="flex align-center justify-center t-0 l-0 absolute w-full h-full br-4 overflow-hidden bw-1 bs-solid bc-red">
                    <div className="absolute t-0 l-0 bg-dark opacity-09 w-full h-full z-index-1"></div>
                    <div className="flex align-center justify-center z-index-2">
                        <div className="mr-4">
                            <span className="text-white f5">Are you sure about deleting this drone part ?</span>
                        </div>
                        <div className="flex align-center">
                            <CheckIcon onClick={handleDelete} className="fill-green w-4 h-4 cursor-pointer stroke-15" />
                            <CloseIcon onClick={() => setDeleteAsked(false)} className="stroke-red w-4 h-4 cursor-pointer stroke-15 ml-3" />
                        </div>
                    </div>
                </div>
            }
        </form>
    )
}

export default DroneItem

const updateCreateDronePart = async (dronePartId, body, imageFile, type) => {

    let newdronePart = null

    type === 'update'
        ? newdronePart = await api.put(`/drone-parts/${dronePartId}`, body)
        : newdronePart = await api.post(`/drone-parts/`, body)

    //If the user added/update the drone image
    if (imageFile) {
        const data = new FormData();
        data.append('files', imageFile)
        data.append('refId', newdronePart.data.id);
        data.append('ref', 'drone-parts');
        data.append('field', 'image');

        await api.post('/upload/', data, { headers: { 'content-type': `multipart/form-data`, }, })
    }

    return newdronePart
}