import React from 'react'

const LinkPreview = ({ preview }) => {
    console.log(preview);

    return <a href={preview.url} target="_blank" rel="noreferrer noopener"><img src={preview.images} /></a>

}

export default LinkPreview