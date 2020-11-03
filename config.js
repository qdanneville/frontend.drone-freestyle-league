const config = {
    APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    AIRMAP_ACCESS_TOKEN: process.env.AIRMAP_ACCESS_TOKEN,
}

module.exports = config