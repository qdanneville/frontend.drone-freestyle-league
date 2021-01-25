import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommonInput from '../../../common/common-input'
import PublicationItem from './publication-item'
import api from '../../../../utils/api'
import Loader from '../../../loader'

const ItemProfiles = ({ handleClick, itemList }) => {

    //State
    let _isMounted = false;
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('')

    //Store
    const dispatch = useDispatch();
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {

        _isMounted = true;

        const fetchPilotFollowers = async () => {
            try {
                let request = await api.get(`/profiles/slug/qdan/followers?_limit=10`);

                if (request.data) {
                    if (_isMounted) setProfiles(request.data)
                }
            }
            catch (err) {
                //TODO err
            }

            if (_isMounted) setIsLoading(false);
        }

        fetchPilotFollowers();

        return (() => {
            _isMounted = false;
        })
    }, [])

    useEffect(() => {
        if (search !== "") {
            api.get(`profiles?_where[_or][0][display_name_contains]=${search}&_where[_or][1][user.username_contains]=${search}&_limit=10`)
                .then(response => setProfiles(response.data))
        } else setProfiles([])

    }, [search])

    if (isLoading) return <Loader className="relative" />

    // Mapping through all gears
    // Mapping through all item list id
    // if a gear item id is found in the item list, we're filtering out this spot

    let filteredList = profiles.slice();

    if (itemList) {
        filteredList = profiles.filter(profile => !(itemList.indexOf('profile' + '-' + profile.id) !== -1))
    }

    return (
        <div className="overflow-y-scroll h-full w-full">
            <div className="w-full sticky t-0 pt-4 pb-4 z-index-3 bg-dark">
                <CommonInput value={search} handleChange={setSearch} type="text" name="search" className="search" placeholder="Search by user tag ..." icon="search" />
            </div>
            <div className="relative mt-2 pb-10">
                {
                    filteredList && filteredList.map((item) => <PublicationItem key={item.id} item={{ id: item.id, itemType: 'profile', image: item.avatar || null, name: item.display_name, type: null, customInfo: null }} handleClick={handleClick} />)
                }
                {filteredList.length === 0 && <span>No gear found</span>}
            </div>
        </div>
    )

}

export default ItemProfiles