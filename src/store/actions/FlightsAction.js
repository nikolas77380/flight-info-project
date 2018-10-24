import axios from 'axios';
import { GET_AIRPORTS, GET_FLIGHTS, REFRESH_DATA, LOADING } from './ActionTypes';

const API_CONFIG = {
    userName: 'nkipniak',
    userPassword: 'desktop0'
}
const AIRPORTS = [
    {
        name: 'New York',
        key: 'KJFK'
    }, {
        name: 'California',
        key: 'KLAX'
    }, {
        name: 'Berlin',
        key: 'EDBB'
    }, {
        name: 'Vancouver',
        key: 'CYVR'
    }, {
        name: 'Paris',
        key: 'LFPG'
    }, {
        name: 'Rome',
        key: 'LIRF'
    }, {
        name: 'Kyiv',
        key: 'UKKK'
    }, {
        name: 'Moscow',
        key: 'UUDD'
    }, {
        name: 'Madrid',
        key: 'LEMD'
    }, {
        name: 'Prague',
        key: 'LKPR'
    }
];
export const get_airports = () => {
    return {
        type: GET_AIRPORTS,
        payload: AIRPORTS
      };
}

export const get_flights = (icao, arrivingMinutes, departingMinutes) => {
    return (dispatch) => {
        dispatch({type: LOADING});
        axios.all([arriving_flights(icao, arrivingMinutes), departing_flights(icao, departingMinutes)])
        .then(axios.spread(function (acct, perms) {
            let arrivingFlights = acct.data;
            let departingFlights = perms.data;
            dispatch({
                type: GET_FLIGHTS,
                payload: {
                    arrivingFlights,
                    departingFlights
                }
            })
          
        })).catch((e)=> {
            dispatch({
                type: GET_FLIGHTS,
                payload: {
                    arrivingFlights: [],
                    departingFlights: []
                }
            }) 
        });
    }
}

function arriving_flights(icao, time) {
    if(time == 0) {
        return 0
    }
    let now = Math.floor(Date.now() / 1000)
    let agoTime = now - (+time*60);
    return axios.get(`https://${API_CONFIG.userName}:${API_CONFIG.userPassword}@opensky-network.org/api/flights/arrival?airport=${icao}&begin=${agoTime}&end=${now}`);
}
  
function departing_flights(icao, time) {
    if(time == 0) {
        return 0
    }
    let now = Math.floor(Date.now() / 1000)
    let agoTime = now - (+time*60);
    return axios.get(`https://${API_CONFIG.userName}:${API_CONFIG.userPassword}@opensky-network.org/api/flights/departure?airport=${icao}&begin=${agoTime}&end=${now}`);
}

export const refresh_data = () => {
    return {
        type: REFRESH_DATA,
    }
}