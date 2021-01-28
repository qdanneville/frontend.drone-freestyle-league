import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../utils/api'

import CommonInput from '../../common/common-input'

import config from '../../../../../config'

import GearIcon from '../../../../assets/svg/my-fleet.svg'
import SpotIcon from '../../../../assets/svg/my-spots.svg'
import ImageIcon from '../../../../assets/svg/image.svg'
import UserIcon from '../../../../assets/svg/user.svg'
import CloseModalIcon from '../../../../assets/svg/close.svg';

import ItemSettingsWindow from './item-settings-window';
import ItemSpots from './window/item-spots'
import ItemGear from './window/item-gear'
import ItemProfiles from './window/item-profiles'
import PublicationItem from './window/publication-item'

import Loader from '../../loader'

//LinkPreview
import LinkPreview from './link-preview'
import getUrls from 'get-urls';
import { isSetEqual, getLastValue } from '../../../utils/set'

const CreatePublicationSettings = () => {

    let _isMounted = false;

    //Publication settings
    const user = useSelector(state => state.auth.user);
    const [categories, setCategories] = useState([])
    const [privacies, setPrivacies] = useState([])

    //Publication body
    const [category, setCategory] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [body, setBody] = useState('');
    const [itemList, setItemList] = useState([]);
    const [linkPreview, setLinkPreview] = useState(null)
    const [urlsSet, setUrlsSet] = useState(null)
    const [previewLoading, setPreviewLoading] = useState(false)

    //Publication photos 
    const [images, setImages] = useState([])
    const [imagesSrc, setImagesSrc] = useState([]);
    const [imagesFiles, setImagesFiles] = useState([]);

    const handleImages = (e) => {
        let newImagesFiles = imagesFiles.slice();
        let newImagesSrc = imagesSrc.slice();
        newImagesFiles.push(e.target.files[0])
        newImagesSrc.push(URL.createObjectURL(e.target.files[0]))
        setImagesFiles(newImagesFiles)
        setImagesSrc(newImagesSrc)
        setLinkPreview(null)
    }

    const handleImageRemove = (imageIndex) => {
        let newImagesFiles = imagesFiles.slice();
        let newImagesSrc = imagesSrc.slice();

        newImagesFiles.splice(imageIndex, 1)
        newImagesSrc.splice(imageIndex, 1)

        setImagesFiles(newImagesFiles)
        setImagesSrc(newImagesSrc)
    }

    //Fetching publication categories
    useEffect(() => {
        _isMounted = true;

        api
            .get('/publication-categories/')
            .then(response => (response && response.data && _isMounted) ? setCategories(response.data) : [])

        api
            .get('/privacies/')
            .then(response => {
                (response && response.data && _isMounted) ? setPrivacies(response.data) : []
                if (response && response.data && _isMounted) setPrivacy(response.data[0])
            })

        return (() => {
            _isMounted = false;
        })
    }, [])


    //Publication State 
    const [itemSettingsIsActive, setItemSettingsIsActive] = useState(false);
    const [itemSettingsWindow, setItemSettingsWindow] = useState(null);

    const openSettingsWindow = (component, title) => {
        setItemSettingsIsActive(true);

        const window = {
            component,
            title
        }

        setItemSettingsWindow(window)
    }

    const resetSettingsWindow = () => {
        setItemSettingsIsActive(false);
        setItemSettingsWindow(null)
    }

    //Publications item(s)
    const handleItemClick = (item) => {
        let newItemList = itemList.slice();
        newItemList.push(item);
        setItemList(newItemList);
        resetSettingsWindow();
    }

    const handleItemRemove = (id) => {
        let newItemList = itemList.slice();
        newItemList = newItemList.filter(el => el.id != id);
        setItemList(newItemList);
        resetSettingsWindow();
    }

    //Publication body
    const handleBodyChange = (e) => {
        setBody(e);

        //We're not previewing anything if an image is already there
        if (!imagesSrc.length > 0) {

            let urls = getUrls(e);

            if (urls.size == 0) {
                setLinkPreview(null)
            } else {
                //If the url set is the same when the user types something, we render the last one
                if ((urlsSet && !isSetEqual(urls, urlsSet)) || (!urlsSet)) {
                    setLinkPreview(null)
                    setPreviewLoading(true);
                    //Fetching url preview from our little server thanks to link-preview-js
                    api.post('/publications/preview-from-content', { content: getLastValue(urls) })
                        .then(res => {
                            setPreviewLoading(false);
                            if (res.data) setLinkPreview(res.data)
                        });
                }
            }
            setUrlsSet(urls);
        }
    }

    const handlePreviewRemove = () => {
        setLinkPreview(null)
    }

    const createPublication = async () => {
        console.log('create publication');
        console.log('publication category', category);
        console.log('publication privacy', privacy);

        let publicationBody = {
            body,
            publication_category: category,
            privacy: privacy,
            publisher: user.profile.profile.id,
            items: itemList.map(item => ({ id: item.itemId, type: item.gearType ? item.gearType : item.itemType }))
        }

        console.log(publicationBody)

        try {
            await updateCreatePublication(null, publicationBody, 'create')
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex relative overflow-hidden" style={{ maxWidth: '500px' }}>
            <div className="w-full h-full">
                <header className="bb-w-1 bl-w-0 bt-w-0 br-w-0 bc-grey-dark-light w-full bs-solid flex items-center justify-center">
                    <h4 className="f3 text-grey-light mb-0 -mt-2 pt-3 pb-5">Create a publication</h4>
                </header>
                <main className="py-4 flex flex-col">
                    <div className="flex items-start justify-between w-full">
                        <div className="flex items-center">
                            <div className="flex">
                                {
                                    user.profile.profile.avatar
                                        ? <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image" style={{ backgroundImage: `url(${config.API_BASE_URL + user.profile.profile.avatar.url})` }}></i>
                                        : <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 bg-grey"></i>
                                }
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="text-grey-light f4 font-bold mb-1">{user.username}</span>
                                <div className="input">
                                    <select className="w-full common-outline small-font" value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                                        {
                                            privacies && privacies.map(privacy => (<option key={privacy.id} value={privacy.id}>{privacy.name}</option>))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-1 flex-col justify-end">
                                <label className="text-grey f5 mb-2 flex align-center">Select a publication type</label>
                                <div className="input">
                                    <select className="w-full common-outline small-font" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option>Choose category</option>
                                        {
                                            categories && categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <CommonInput value={body} handleChange={handleBodyChange} type="textarea" name="description" className="h-40 bg-transparent br-6" placeholder="What do you want to say" />
                    </div>
                    {((linkPreview && Object.keys(linkPreview).length !== 0) || previewLoading) &&
                        <div className="bc-grey-dark-light bs-solid br-4 bw-1 mb-4 overflow-hidden flex items-center justify-center">
                            {linkPreview
                                ? <LinkPreview preview={linkPreview} handlePreviewRemove={handlePreviewRemove} />
                                : <Loader className="relative" />
                            }
                        </div>
                    }
                    <div className="">
                        <ul className="flex flex-col">
                            {
                                itemList.map(item => <PublicationItem key={item.id} item={{ id: item.id, itemType: item.itemType, image: item.image || null, name: item.name, type: item.type || '', customInfo: item.customInfo || null }} handleRemove={handleItemRemove} />)
                            }
                        </ul>
                    </div>
                    {imagesSrc.length > 0 &&
                        <div className="bc-grey-dark-light bs-solid br-4 bw-1 mb-4">
                            <ul className="flex w-full py-1">
                                {imagesSrc.map((imageSrc, i) =>
                                    <li key={i} className="relative w-full h-40 mx-1">
                                        <CloseModalIcon onClick={() => handleImageRemove(i)} className="z-index-2 absolute t-2 r-2 w-7 h-7 stroke-grey cursor-pointer bg-grey-dark-light p-2 br-50 hover:bg-dark-3 z-index-1" />
                                        <i className="relative flex h-full justify-center align-start w-full br-4 overflow-hidden background-image block" style={{ backgroundImage: `url(${imageSrc})` }}></i>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                    <div className="bc-grey-dark-light bs-solid br-4 bw-1">
                        <ul className="flex items-center justify-evenly">
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full">
                                <input className="common-input-file text-grey f4 ml-4" id="image" name="image" type="file" onChange={handleImages} accept="image/png, image/jpeg" />
                                <label className="flex flex-1 items-center justify-center text-grey f4 ml-4 custom cursor-pointer" htmlFor="image">
                                    <ImageIcon className="w-5 h-5 fill-white mr-4" />Photo</label>
                            </li>
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={() => openSettingsWindow(<ItemGear handleClick={handleItemClick} itemList={itemList.map(item => item.id)} />, 'Add a gear')}>
                                <GearIcon className="w-6 h-6 fill-green" />
                                <span className="text-grey f4 ml-4">Gear</span>
                            </li>
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={() => openSettingsWindow(<ItemSpots handleClick={handleItemClick} itemList={itemList.map(item => item.id)} />, 'Add a spot')}>
                                <SpotIcon className="w-6 h-6 fill-yellow" />
                                <span className="text-grey f4 ml-4">Spot</span>
                            </li>
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={() => openSettingsWindow(<ItemProfiles handleClick={handleItemClick} itemList={itemList.map(item => item.id)} />, 'Mention a user')}>
                                <UserIcon className="w-5 h-5 fill-grey-light" />
                                <span className="text-grey f4 ml-4">User</span>
                            </li>
                        </ul>
                    </div>
                </main>
                <footer className="flex items-center justify-center">
                    <button onClick={createPublication} className={`btn w-full ${body.length === 0 ? 'disabled' : ''}`} >Publish</button>
                </footer>
            </div>
            <ItemSettingsWindow active={itemSettingsIsActive} window={itemSettingsWindow} resetSettingsWindow={resetSettingsWindow} />
        </div >
    )
}

export default CreatePublicationSettings

const updateCreatePublication = async (publicationId, body, type, imagesFiles) => {

    let newPublication = null

    type === 'update'
        ? newPublication = await api.put(`/publications/${publicationId}`, body)
        : newPublication = await api.post(`/publications/`, body)

    //If the user added/update the publications images
    // if (imageFile) {
    //     const data = new FormData();
    //     data.append('files', imageFile)
    //     data.append('refId', newdrone.data.id);
    //     data.append('ref', 'drone');
    //     data.append('field', 'image');

    //     await api.post('/upload/', data, { headers: { 'content-type': `multipart/form-data`, }, })
    // }

    return newPublication
}