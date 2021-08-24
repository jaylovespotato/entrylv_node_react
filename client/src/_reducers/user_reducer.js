import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from '../_actions/types'

export default function(state={}, action){
    switch (action.type) {
        // 두번째 파라미터는 그냥 내가  임의로 명명하는 것.
        case LOGIN_USER:
            return{...state, loginSuccess: action.payload}
            break;
    
        case REGISTER_USER:
            return{...state, register: action.payload}
            break;

        case AUTH_USER:
            return{...state, userData: action.payload}
            break;
    

        default:
            return state;
    }
}