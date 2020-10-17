const config = {
    APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost', 
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
}

console.log(process.env.API_BASE_URL);

module.exports = config