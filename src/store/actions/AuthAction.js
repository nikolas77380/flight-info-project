import { LOGIN } from './ActionTypes';

export const login_user = () => {
    return (dispatch) => {
        dispatch({
            type: LOGIN,
            user_is_logged_in: true
        })
    }
}