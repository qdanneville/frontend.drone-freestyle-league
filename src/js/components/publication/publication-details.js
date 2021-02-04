import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import config from '../../../../config'
import api from '../../utils/api'

import PublicationItem from './settings/window/publication-item'
import CreatePublicationSettings from './settings/create-publication-settings'

import LinkPreview from './settings/link-preview'
import getUrls from 'get-urls';
import { getLastValue } from '../../utils/set'

import Loader from '../loader'
import DotsIcon from '../../../assets/svg/dots.svg'

const PublicationDetails = ({ publication }) => {
    let _isMounted = false;

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    const [linkPreview, setLinkPreview] = useState(null)
    const [previewLoading, setPreviewLoading] = useState(false)

    useEffect(() => {
        _isMounted = true;

        let urls = getUrls(publication.body);

        if (urls.size !== 0) {

            setPreviewLoading(true);
            //Fetching url preview from our little server thanks to link-preview-js
            api.post('/publications/preview-from-content', { content: getLastValue(urls) })
                .then(res => {
                    setPreviewLoading(false);
                    if (res.data) setLinkPreview(res.data)
                });
        }

        return (() => {
            _isMounted = false;
        })
    }, [])

    const openPublicationModal = () => {
        const modalContent = {
            component: <CreatePublicationSettings publication={publication} />,
            width: '500px',
            height: 'auto'
        }

        dispatch({ type: 'SET_MODAL_OPTIONS', payload: modalContent })
        dispatch({ type: 'SET_SHOW_MODAL' })
    }

    let date = new Date(publication.updated_at);
    date = date.toLocaleDateString('en-US')

    return (
        <div className="flex relative overflow-hidden p-4 br-6 bg-grey-dark-light w-full mt-4">
            <div className="w-full h-full">
                <main className="flex flex-col">
                    <div className="flex items-start justify-between w-full">
                        <div className="flex items-center">
                            <div className="flex">
                                {
                                    (publication.publisher && publication.publisher.avatar)
                                        ? <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 background-image" style={{ backgroundImage: `url(${config.API_BASE_URL + publication.publisher.avatar.url})` }}></i>
                                        : <i className="w-10 h-10 w-8-md h-8-md br-50 bg-white shadow-1 overflow-hidden bs-solid bc-white bw-2 bg-grey"></i>
                                }
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="text-white f4 font-bold mb-1">{publication.publisher.display_name}</span>
                                <div className="flex items-center">
                                    <span className="text-grey f5">{date}</span>
                                    {publication.publication_category && <span className="text-white f5">{publication.publication_category.name && publication.publication_category.name}</span>}
                                </div>
                            </div>
                        </div>
                        {(user.profile.profile.id === publication.publisher.id) &&
                            <div className="justify-self-end cursor-pointer" onClick={openPublicationModal}>
                                <DotsIcon className="w-4 h-4 fill-grey" />
                            </div>
                        }
                    </div>
                    <div className="mt-4 mb-4">
                        <span className="text-white pre-line w-full bg-transparent bw-0 mt-2 ml-0 pl-0 mb-0 resize-0 outline-0 h-full overflow-y-scroll" readOnly="readonly">{publication.body}</span>
                    </div>
                    {((linkPreview && Object.keys(linkPreview).length !== 0) || previewLoading) &&
                        <div className="bc-grey-dark-light bs-solid br-4 bw-1 mb-4 overflow-hidden flex items-center justify-center">
                            {linkPreview
                                ? <a href={linkPreview.url} className="w-full" target="_blank" rel="noopener"><LinkPreview preview={linkPreview} /></a>
                                : <Loader className="relative" />
                            }
                        </div>
                    }
                    <div className="">
                        <ul className="flex flex-col">
                            {
                                publication.publication_items &&
                                publication.publication_items.length > 0 &&
                                publication.publication_items.map((el) => {

                                    const { item } = el

                                    if (el.itemType === 'spot') {
                                        item.type = item.spot_type
                                    }

                                    return <PublicationItem key={item.id} item={{ id: item.id, itemType: el.itemType, image: item.image || item.avatar || null, name: item.name || item.display_name, type: item.type && item.type.name || '', customInfo: item.manufacturer && item.manufacturer.name || item.privacy || null, slug: item.slug }} />
                                })
                            }
                        </ul>
                    </div>
                    {publication.media.length > 0 &&
                        <div className="bc-grey-dark-light bs-solid br-4 bw-1 mb-4">
                            <ul className="flex w-full py-1">
                                {publication.media.map((image) =>
                                    <li key={image.id} className="relative w-full h-40 mx-1">
                                        <i className="relative flex h-full justify-center align-start w-full br-4 overflow-hidden background-image block" style={{ backgroundImage: `url(${config.API_BASE_URL + image.url})` }}></i>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                </main>
            </div>
        </div>
    )
}

export default PublicationDetails