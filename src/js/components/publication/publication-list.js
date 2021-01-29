import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import api from '../../utils/api'
import PublicationDetails from './publication-details'
import Loader from '../loader'

const PublicationList = ({ currentUser }) => {

    let _isMounted = false;

    const user = useSelector(state => state.auth.user);
    const [publications, setPublications] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        _isMounted = true;

        api.get(`/publications?publisher.user=${user.id}&_sort=updated_at:DESC`)
            .then(response => (response && response.data && _isMounted && setPublications(response.data)))
            .finally(() => setIsLoading(false))

        return (() => {
            _isMounted = false;
        })
    }, [])

    if (isLoading) return <Loader className="relative" />

    return (
        <div>
            {
                publications && publications.length > 0 && publications.map(publication => <PublicationDetails key={publication.id} publication={publication} />)
            }
        </div>
    )
}

export default PublicationList