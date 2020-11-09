import axios from 'axios'
import config from '../../../config'

export const fetchRules = (lng, lat) => {
    const request = axios.post(`https://api.airmap.com/rules/v1/`, {
        geometry: {
            type: "Point",
            coordinates: [lng, lat]
        }
    }, {
        headers: {
            "x-api-key": config.AIRMAP_ACCESS_TOKEN
        }
    })

    //We're getting the first rule id
    return request.then(response => response.data.data[0].id).catch(error => { throw error })
}

export const fetchAdvisories = (lng, lat, ruleId) => {
    const request = axios.post(`https://api.airmap.com/advisory/v2/airspace?X_API_KEY=${config.AIRMAP_ACCESS_TOKEN}`, {
        geometry: {
            type: "Point",
            coordinates: [lng, lat]
        },
        rulesets: ruleId
    }, {
        headers: {
            "x-api-key": config.AIRMAP_ACCESS_TOKEN
        }
    })

    return request.then(response => response).catch(error => { throw error })
}

// export const feetchRulesAndAdvisories = (lng, lat) => {
//     axios.post('https://api.airmap.com/rules/v1/', {
//         geometry: {
//             type: "Point",
//             coordinates: [markerLng, markerLat]
//         }
//     })
//         .then((response) => {
//             console.log(response);

//             axios.post('https://api.airmap.com/advisory/v2/airspace', {
//                 geometry: {
//                     type: "Point",
//                     coordinates: [markerLng, markerLat]
//                 },
//                 rulesets: response.data.data[0].id
//             })
//                 .then((response) => {
//                     console.log(response);
//                 }, (error) => {
//                     console.log(error);
//                 });
//         }, (error) => {
//             console.log(error);
//         });
// }