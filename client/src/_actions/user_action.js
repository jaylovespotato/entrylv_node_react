import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types'

export function loginUser(datatTosubmit){
    //서버에서 받은 데이터 (response)를 request에 저장
    const request = axios.post('/api/users/login', datatTosubmit)
    .then(response => response.data)

    // 이제 action으로 보내야함
    return{
        type: LOGIN_USER,
        payload: request

    }
}

export function registerUser(datatTosubmit){
    //서버에서 받은 데이터 (response)를 request에 저장
    const request = axios.post('/api/users/register', datatTosubmit)
    .then(response => response.data)

    // 이제 action으로 보내야함
    return{
        type: REGISTER_USER,
        payload: request

    }
}


export function auth() {
    //서버에서 받은 데이터 (response)를 request에 저장
    const request = axios.get('/api/users/auth')
        .then(response => response.data)
    // 이제 action으로 보내야함
    return {
        type: AUTH_USER,
        payload: request
    }
}
