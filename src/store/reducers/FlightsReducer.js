import { GET_AIRPORTS, LOGIN, GET_FLIGHTS, REFRESH_DATA, LOADING } from './../actions/ActionTypes';

const initialState = {
    user_is_logged_in: false,
    airports: [],
    departingFlights: [],
    arrivingFlights: [],
    loading: false
  }
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                ...state,
                user_is_logged_in: true
            }
        }
        case GET_AIRPORTS : {
            return {
                ...state,
                airports: action.payload,
                loading: false
            }
        }
        case GET_FLIGHTS : {
            return {
                ...state,
                departingFlights: action.payload.departingFlights,
                arrivingFlights: action.payload.arrivingFlights,
                loading: false
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case REFRESH_DATA: {
            return {
                ...state,
                departingFlights: [],
                arrivingFlights: [],
                loading: false
            }
        }
        default: {
            return {
                initialState
            }
        }
    }
}

export default reducer;