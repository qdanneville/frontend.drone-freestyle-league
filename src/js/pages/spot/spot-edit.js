import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../utils/api';

import Mapbox from '../../components/map/mapbox'
import Advisories from '../../components/advisories/'
import spotImageUtils from '../../components/spot/spot-image'
import Loader from '../../components/loader'

import EmptyIcon from '../../../assets/svg/empty.svg'
import SpotImagePlaceholder from '../../../assets/spot-placeholder.jpg'

const privaciesData = [
    'private',
    'friends',
    'public'
]

const SpotEdit = (props) => {

    let _isMounted = false;

    const user = useSelector(state => state.auth.user)
    const markers = useSelector(state => state.map.markers)
    const history = useHistory();

    const { slug } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [spotAdvisories, setSpotAdvisories] = useState(null);
    const [spotCantBePublic, setSpotCantBePublic] = useState(false);

    //Form
    const [accessibilities, setAccessibilities] = useState([]);
    const [types, setTypes] = useState([]);
    const [privacies, setPrivacies] = useState(privaciesData);
    const [spotName, setSpotName] = useState('');
    const [spotId, setSpotId] = useState(null);
    const [spotImage, setSpotImage] = useState(null);
    const [spotImageSrc, setSpotImageSrc] = useState(SpotImagePlaceholder);
    const [spotImageFile, setSpotImageFile] = useState(null);
    const [spotDescription, setSpotDescription] = useState("");
    const [spotAccessibility, setSpotAccessibility] = useState(1);
    const [spotType, setSpotType] = useState(1);
    const [spotDifficulty, setSpotDifficulty] = useState(0);
    const [spotPrivacy, setSpotPrivacy] = useState(privacies[0]);
    const [spotShowCreator, setSpotShowCreator] = useState(false);
    const [enableLikes, setEnableLikes] = useState(false);
    const [enableShares, setEnableShares] = useState(false);
    const [enableComments, setEnableComments] = useState(false);
    const [enableTags, setEnableTags] = useState(false);
    const [spotCoords, setSpotCoords] = useState(null);
    const [spotSubmitted, setSpotSubmitted] = useState(false);
    const [locationCheckSubmitted, setLocationCheckSubmitted] = useState(false);
    const [spotIsPublic, setSpotIsPublic] = useState(false)
    const [spotPublicCanBeCreated, setSpotPublicCanBeCreated] = useState(false);
    const [checkLocationRequired, setCheckLocationRequired] = useState(false);
    const [showPublicToastInfoOnce, setShowPublicToastInfoOnce] = useState(false);
    const [deleteSpotAsked, setDeleteSpotAsked] = useState(false);

    //Edit
    useEffect(() => {
        _isMounted = true;

        if (slug) {
            api.get(`spots/${slug}`)
                .then(response => {

                    const spot = response.data

                    if (spot && _isMounted) {
                        setSpotId(spot.id)
                        setSpotName(spot.name)
                        setSpotImage(spot.image)
                        setSpotDescription(spot.description)
                        setSpotAccessibility(spot.spot_accessibility)
                        setSpotType(spot.spot_type)
                        setSpotDifficulty(spot.difficulty)
                        setSpotPrivacy(spot.privacy)
                        setSpotShowCreator(spot.showCreatorName)
                        setEnableLikes(spot.enableLikes)
                        setEnableShares(spot.enableShares)
                        setEnableComments(spot.enableComments)
                        setEnableTags(spot.enableTags)
                        setSpotCoords({ lng: spot.longitude, lat: spot.latitude })
                    }

                    //Once we've got the spot, we could retrieve updated airspace advisories
                    api.get(`/airspaces?lng=${spot.longitude}&lat=${spot.latitude}`)
                        .then(response => {
                            if (_isMounted) {
                                setSpotAdvisories(response.data);
                                setSpotPublicCanBeCreated(response.data.color !== 'red')
                                setSpotCantBePublic(response.data.color === 'red')
                                setIsLoading(false);
                            }
                        })
                })
                .catch(err => _isMounted && history.push('/spots/'))
        }
        else _isMounted && setIsLoading(false);
        
        return (() => {
            _isMounted = false;
        })
    }, [slug])

    //WE NEED TO HIGHLIGHT THE CURRENT SPOT MARKER
    if (markers) {
        const currentMarker = markers.find(marker => marker._element.id === `marker-${spotId}`)
        if (currentMarker) currentMarker._element.classList.add('highlight')
    }

    //Form create
    useEffect(() => {
        api
            .get('/spot-accessibilities')
            .then(response => (response && response.data && _isMounted) ? setAccessibilities(response.data) : [])

        api
            .get('/spot-types')
            .then(response => (response && response.data && _isMounted) ? setTypes(response.data) : [])
    }, [])

    const handleToggles = (getter, setter) => {
        setter(!getter);
    }

    const checkSpotLocation = () => {

        setLocationCheckSubmitted(true);
        setCheckLocationRequired(false);

        const checkToast = toast.info("Checking your spot location 🧐", { autoClose: false, className: "loading" });

        api
            .get(`/airspaces?lng=${spotCoords.lng}&lat=${spotCoords.lat}`)
            .then(response => {
                setSpotAdvisories(response.data);
                setSpotPublicCanBeCreated(response.data.color !== "red")
            })
            .catch(err => toast.error("Ewww, something went wrong  🤔"))
            .finally(() => { setLocationCheckSubmitted(false); toast.dismiss(checkToast); })
    }

    //We want to reset the rules & advisories when the user drags the spot marker to a new location
    const changeSpotCoords = (coords) => {
        setSpotCoords(coords);
        setSpotAdvisories(null);
        setSpotPublicCanBeCreated(false)
    }

    //Toaster
    const handleShowPublicToastInfoOnce = () => {
        if (!showPublicToastInfoOnce) {
            toast.info("You must check your location spot before submitting a public spot");
            //Won't be triggered again
            setShowPublicToastInfoOnce(true)
        };
    }

    const deletePost = (e) => {
        e.preventDefault();

        api.delete(`/spots/${spotId}`)
            .then(response => {
                history.push({ pathname: "/spots/" })
                toast.success("Your spot has been successfully deleted");
            })
            .catch(err => toast.error("Ewww, something went wrong  🤔"));
    }

    const handleSpotSubmit = (e) => {

        e.preventDefault();
        setSpotSubmitted(true);

        const body = {
            pilot: user.profile.pilot_id,
            name: spotName,
            latitude: spotCoords.lat,
            longitude: spotCoords.lng,
            description: spotDescription,
            spot_type: spotType,
            spot_accessibility: spotAccessibility,
            difficulty: spotDifficulty,
            privacy: spotPrivacy,
            enableLikes: enableLikes,
            enableShares: enableShares,
            enableComments: enableComments,
            enableTags: enableTags,
            public: spotPrivacy === "public",
            showCreatorName: spotShowCreator
        }

        //TODO OPTIMIZE SPOT CREATION
        if (slug) {
            //UPDATE
            api
                .put(`/spots/${spotId}`, body)
                .then(response => {

                    if (spotImageFile) {
                        const data = new FormData();

                        data.append('files', spotImageFile)
                        data.append('refId', response.data.id);
                        data.append('ref', 'spot');
                        data.append('field', 'image');

                        api
                            .post('/upload/', data, {
                                headers: {
                                    'content-type': `multipart/form-data`,
                                },
                            })
                            .then(response => {
                                history.push({
                                    pathname: "/map",
                                    search: '?spot',
                                    state: {
                                        coords: spotCoords
                                    }
                                })
                                toast.success("Your spot has been successfully updated");
                            })
                            .catch(err => {
                                console.log(err)
                                console.log(err.response)
                            })
                    }
                    else {
                        history.push({
                            pathname: "/map",
                            search: '?spot',
                            state: {
                                coords: spotCoords
                            }
                        })
                        toast.success("Your spot has been successfully updated");
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log(err.data)
                    toast.error("Ewww, something went wrong  🤔");
                })
        } else {
            //CREATE
            api
                .post('/spots/', body)
                .then(response => {

                    //TODO OPTIMIZE SPOT CREATION
                    if (spotImageFile) {
                        const data = new FormData();

                        data.append('files', spotImageFile)
                        data.append('refId', response.data.id);
                        data.append('ref', 'spot');
                        data.append('field', 'image');

                        api
                            .post('/upload/', data, {
                                headers: {
                                    'content-type': `multipart/form-data`,
                                },
                            })
                            .then(response => {
                                history.push({
                                    pathname: "/map",
                                    search: '?spot',
                                    state: {
                                        coords: spotCoords
                                    }
                                })
                                toast.success("Your spot has been successfully created");
                            })
                            .catch(err => {
                                console.log(err)
                                console.log(err.response)
                            })
                    } else {
                        history.push({
                            pathname: "/map",
                            search: '?spot',
                            state: {
                                coords: spotCoords
                            }
                        })
                        toast.success("Your spot has been successfully created");
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log(err.data)
                    toast.info("Ewww, something went wrong  🤔");
                })
        }
    }

    return (
        <div className="w-full px-10">
            {
                isLoading ? <Loader />
                    :
                    <form onSubmit={handleSpotSubmit}>
                        <h1 className="text-yellow good-times f2 mt-0 pt-10">{slug ? 'Spot Edition' : 'Spot creation'}</h1>
                        <div className="flex flex-col-md">
                            <div className="w-25-per w-full-md">
                                <div className="flex flex-col bg-grey-dark-light br-4 py-3 px-4 mb-3">
                                    <input className="common-input mb-2 mt-0" type="text" required value={spotName} placeholder="Spot name" onChange={(e) => setSpotName(e.target.value)} />
                                    <span className="text-grey f4">Creator <strong className="text-white font-bold italic">{user.profile.profile.display_name}</strong></span>
                                </div>
                                <div className="flex flex-col bg-grey-dark-light br-4 py-3 px-4">
                                    <h3 className="text-orange f6 uppercase good-times font-normal mt-0 mb-2">Spot type</h3>
                                    <select className="common-input" value={spotType} onChange={(e) => setSpotType(e.target.value)}>
                                        {
                                            types.map(type => (<option key={type.id} value={type.id}>{type.name}</option>))
                                        }
                                    </select>
                                    <h3 className="text-orange f6 uppercase good-times font-normal mb-2 mt-6">Difficulty</h3>
                                    <p className="f6 text-grey mb-2 mt-0">The difficulty of a spot is determined by the gaps between obsacles, the bigger they are, the easier. Help the community find easy spots to fly at to grow their skills.</p>
                                    <input className="common-range mt-0 mb-0" type="range" value={spotDifficulty} onChange={(e) => setSpotDifficulty(e.target.value)} />
                                    <h3 className="text-yellow-darker f6 uppercase good-times font-normal mt-6">Accessibility</h3>
                                    <select className="common-input" value={spotAccessibility} onChange={(e) => setSpotAccessibility(e.target.value)}>
                                        {
                                            accessibilities.map(accessibility => (<option key={accessibility.id} id={accessibility.id} value={accessibility.id}>By {accessibility.name}</option>))
                                        }
                                    </select>
                                    <h3 className="text-yellow-darker f6 uppercase good-times font-normal mt-6">Privacy</h3>
                                    <p className="f6 text-grey mb-4 mt-0">Choose who you want to share your spot with. Share it to the community to earn Points. Share it with friends or group of friends. Keep your spots Private, no resriction. If your spot is in a NFZ, it can only be private. Once public, a Spot cannot be private again. </p>
                                    <ul className="flex align-center justify-even br-10 toggle-privacies">
                                        {
                                            privacies.map((privacy, i) => (
                                                <li key={i} className={`${privacy === spotPrivacy ? 'active' : ''} ${(spotCantBePublic && privacy === "public") && 'cursor-disable bg-dark'} toggle-privacy flex-1 text-align-center`} onClick={() => { if (spotCantBePublic && privacy === 'public') return false; setSpotPrivacy(privacy); setSpotIsPublic(privacy === "public"); setCheckLocationRequired(privacy === "public"); privacy === "public" ? handleShowPublicToastInfoOnce() : null }}>
                                                    <span className="py-4 block">{privacy}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="flex align-center justify-between mt-4 mb-0">
                                        <span className="text-grey f5 italic mr-3">Show creator's name</span>
                                        <label className="common-toggle">
                                            <input checked={spotShowCreator} type="checkbox" onChange={() => handleToggles(spotShowCreator, setSpotShowCreator)} />
                                            <span className="slider">
                                                <i className="circle"></i>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex align-center justify-between mt-2 mb-0">
                                        <span className="text-grey f5 italic mr-3">Enable likes</span>
                                        <label className="common-toggle">
                                            <input checked={enableLikes} type="checkbox" onChange={() => handleToggles(enableLikes, setEnableLikes)} />
                                            <span className="slider">
                                                <i className="circle"></i>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex align-center justify-between mt-2 mb-0">
                                        <span className="text-grey f5 italic mr-3">Enable shares</span>
                                        <label className="common-toggle">
                                            <input checked={enableShares} type="checkbox" onChange={() => handleToggles(enableShares, setEnableShares)} />
                                            <span className="slider">
                                                <i className="circle"></i>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex align-center justify-between mt-2 mb-0">
                                        <span className="text-grey f5 italic mr-3">Enable comments</span>
                                        <label className="common-toggle">
                                            <input checked={enableComments} type="checkbox" onChange={() => handleToggles(enableComments, setEnableComments)} />
                                            <span className="slider">
                                                <i className="circle"></i>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex align-center justify-between mt-2 mb-0">
                                        <span className="text-grey f5 italic mr-3">Enable tags</span>
                                        <label className="common-toggle">
                                            <input checked={enableTags} type="checkbox" onChange={() => handleToggles(enableTags, setEnableTags)} />
                                            <span className="slider">
                                                <i className="circle"></i>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-25-per w-full-md">
                                <div className="flex-1 flex flex-col bg-grey-dark-light br-4 py-3 px-4 mx-3 mb-3 ">
                                    {
                                        spotImage
                                            ? <i className="relative flex h-40 justify-center align-start w-full br-4 overflow-hidden background-image block" style={{ backgroundImage: `url(${spotImageUtils(spotImage)})` }}></i>
                                            : <i className="relative flex h-40 justify-center align-start w-full br-4 overflow-hidden background-image block" style={{ backgroundImage: `url(${spotImageSrc})` }}></i>
                                    }
                                    <input className="common-input-file  mt-0 mb-2 overflow-hidden" id="avatar" name="avatar" type="file" placeholder="Spot image" onChange={(e) => { setSpotImageFile(e.target.files[0]); setSpotImageSrc(URL.createObjectURL(e.target.files[0])); setSpotImage(null) }} />
                                    <label className="mt-2 text-align-center" htmlFor="avatar">Add picture</label>
                                    <textarea className="flex-1 common-input mt-2 mb-0 resize-0 common-outline" placeholder="Spot description" value={spotDescription} onChange={(e) => setSpotDescription(e.target.value)} />
                                </div>
                                <div className="flex-1 flex flex-col bg-grey-dark-light br-4 py-3 px-4 mx-3">
                                    <h3 className="text-yellow-darker f6 uppercase good-times font-normal mt-0">Spot location advisories</h3>
                                    <div className="flex-1 bg-dark-3 br-5 relative">
                                        {
                                            (!spotAdvisories)
                                                ? <EmptyIcon className="absolute transform-center" />
                                                : <Advisories advisories={spotAdvisories.advisories} color={spotAdvisories.color} lng={spotCoords.lng} lat={spotCoords.lat} />
                                        }
                                    </div>
                                    <button type="button" className={`btn-secondary orange mt-3 ${locationCheckSubmitted ? 'loading' : ''} ${checkLocationRequired ? 'wiggle-animation' : ''}`} onClick={checkSpotLocation}>
                                        <span>Check location</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-half w-full-md relative br-4 overflow-hidden">
                                {
                                    !slug
                                        ? <Mapbox addSpot setMarkerCoords={changeSpotCoords} />
                                        : <Mapbox editSpot spotCoords={spotCoords} />
                                }

                            </div>
                        </div>
                        <div className="flex justify-end mt-4 w-full align-center">
                            <div className="flex flex-col">
                                <span className="mr-4 f6 text-grey">*You must check a spot location if you want to create a public spot</span>
                                <span className="mr-4 f6 text-grey">*You won't be able to create a public spot in a non-fly-zone (red flag)</span>
                            </div>
                            {!slug
                                ? <div className="flex align-center">
                                    <button className={`btn-secondary teal ${spotIsPublic && !spotPublicCanBeCreated ? 'disabled' : ''} ${spotSubmitted && 'loading'}`} ><span>Create Spot</span></button>
                                </div> :
                                !deleteSpotAsked
                                    ? <div className="flex align-center">
                                        <button onClick={() => setDeleteSpotAsked(true)} type="button" className={`btn-secondary red`}><span>Delete spot</span></button>
                                        <button className={`btn-secondary teal ml-4${spotIsPublic && !spotPublicCanBeCreated ? 'disabled' : ''} ${spotSubmitted && 'loading'}`} ><span>Update Spot</span></button>
                                    </div>
                                    : <div className="flex align-center">
                                        <button onClick={() => setDeleteSpotAsked(false)} type="button" className={`btn-secondary red`}><span>No</span></button>
                                        <button onClick={deletePost} className={`btn-secondary teal ml-4`}><span>Yes</span></button>
                                    </div>
                            }
                        </div>
                    </form>
            }
        </div>
    )
}

export default SpotEdit;