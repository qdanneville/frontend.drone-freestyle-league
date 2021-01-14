import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import CommonInput from '../../common/common-input'

import config from '../../../../../config'

import GearIcon from '../../../../assets/svg/my-fleet.svg'
import SpotIcon from '../../../../assets/svg/my-spots.svg'
import ImageIcon from '../../../../assets/svg/image.svg'
import UserIcon from '../../../../assets/svg/user.svg'

import ItemSettingsWindow from './item-settings-window';
import ItemSpots from './window/item-spots'
import PublicationItem from './window/publication-item'

const CreatePublicationSettings = () => {

    //Publication settings
    const user = useSelector(state => state.auth.user);
    const [categories, setCategories] = useState([1, 2, 3, 4])
    const [privacies, setPrivacies] = useState(['public', 'private', 'followers'])

    //Publication body
    const [category, setCategory] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [body, setBody] = useState('');
    const [itemList, setItemList] = useState([]);

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

    const handleItemRemove = (item) => {
        let newItemList = itemList.slice();
        newItemList = newItemList.filter(el => el.id != item.id);
        setItemList(newItemList);
        resetSettingsWindow();
    }

    console.log('publications items : ', itemList);

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
                                            privacies.map(privacy => (<option key={privacy} value={privacy}>{privacy}</option>))
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
                                            categories.map(category => (<option key={category} value={category}>{category}</option>))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <CommonInput value={body} handleChange={setBody} type="textarea" name="description" className="h-40 bg-transparent br-6" placeholder="What do you want to say" />
                    </div>
                    <div className="">
                        <ul className="flex flex-col">
                            {
                                itemList.map(item => <PublicationItem key={item.id} item={{ id: item.id, itemType: item.itemType, image: item.image || null, name: item.name, type: item.type || '', customInfo: item.customInfo || '...' }} handleRemove={handleItemRemove} />)
                            }
                        </ul>
                    </div>
                    <div className="bc-grey-dark-light bs-solid br-4 bw-1">
                        <ul className="flex items-center justify-evenly">
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={() => openSettingsWindow(<ItemSpots />, 'Identify a person')}>
                                <ImageIcon className="w-5 h-5 fill-white" />
                                <span className="text-grey f4 ml-4">Photo</span>
                            </li>
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={() => openSettingsWindow(<ItemSpots />, 'Add a gear')}>
                                <GearIcon className="w-6 h-6 fill-green" />
                                <span className="text-grey f4 ml-4">Gear</span>
                            </li>
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={() => openSettingsWindow(<ItemSpots handleClick={handleItemClick} />, 'Add a spot')}>
                                <SpotIcon className="w-6 h-6 fill-yellow" />
                                <span className="text-grey f4 ml-4">Spot</span>
                            </li>
                            <li className="flex flex-1 items-center justify-center cursor-pointer hover:bg-dark-3 py-3 br-10 h-full" onClick={() => openSettingsWindow(<ItemSpots />, 'Mention a user')}>
                                <UserIcon className="w-5 h-5 fill-grey-light" />
                                <span className="text-grey f4 ml-4">User</span>
                            </li>
                        </ul>
                    </div>
                </main>
                <footer className="flex items-center justify-center">
                    <button className="btn w-full">Publish</button>
                </footer>
            </div>
            <ItemSettingsWindow active={itemSettingsIsActive} window={itemSettingsWindow} resetSettingsWindow={resetSettingsWindow} />
        </div>
    )
}

export default CreatePublicationSettings