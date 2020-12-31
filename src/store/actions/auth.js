import * as actionTypes from './action-types'

export const authStart = () => {return{type:actionTypes.AUTH_START}}
export const authSuccess = (token,userId) => {return{idToken:token,userId:userId,type:actionTypes.AUTH_SUCCESS}}
export const authFail = (error) => {return {type: actionTypes.AUTH_FAIL, error: error}}


export const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userID')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};


export const addUser = (email,password,userName,isValid) =>{
    return dispatch => {
        isValid? dispatch(authStart()):dispatch(authFail('invalid info'))
        const authData = {email:email,password:password,userName:userName}
        
        // const url = 'http://localhost:8080/auth/signup'
        const url = 'https://socialmedia-backend.herokuapp.com/auth/signup'
        fetch(url, {method:'PUT',headers: {'Content-Type': 'application/json'},body: JSON.stringify(authData)})
        .then(res => {
            if (res.status === 422) {throw new Error('Validation failed.');}
            if (res.status !== 200 && res.status !== 201) {throw new Error('Could not authenticate you!');}
            return res.json();
          })
        .then(res => {
            localStorage.setItem("token",res.token)
            localStorage.setItem("userID",res.userId)
            const expirationDate = new Date(new Date().getTime()+ res.expirationTime.toString()*3600000)
            localStorage.setItem("expirationDate",expirationDate)
            dispatch(authSuccess(res.token,res.userId))
        })
        .catch(err=>{dispatch(authFail(err))})
    }
}


export const userSignIn = (email,password) =>{
    return dispatch => {
        dispatch(authStart())
        const authData = {email:email,password:password}
        fetch('https://socialmedia-backend.herokuapp.com/auth/login', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(authData)})
        // fetch('http://localhost:8080/auth/login', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(authData)})
        .then(res => {
            if (res.status === 422) {throw new Error('Validation failed.');}
            if (res.status !== 200 && res.status !== 201) {throw new Error('Could not authenticate you!');}
            return res.json();
          })
        .then(res => {
            const expirationDate = new Date(new Date().getTime()+ res.expirationTime.toString()*3600000)
            localStorage.setItem("token",res.token)
            localStorage.setItem("expirationDate",expirationDate)
            localStorage.setItem("userID",res.userId)
            dispatch(authSuccess(res.token,res.userId))
        })
        .catch(err=>{dispatch(authFail(err))})
    }
}



export const checkSignIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userID');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};