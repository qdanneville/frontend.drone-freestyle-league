import config from '../../../../config'

const spotImage = (image) => {
    let spotImage = null;

    if (image && image.formats && image.formats.small) {
        spotImage = config.API_BASE_URL + image.formats.small.url
    } else if (image && image.url) {
        spotImage = config.API_BASE_URL + image.url
    }

    return spotImage
}

export default spotImage