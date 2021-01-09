import * as actionTypes from './action-types'

export const authStart = () => {return{type:actionTypes.AUTH_START}}
export const authSuccess = (token,userId) => {return{idToken:token,userId:userId,type:actionTypes.AUTH_SUCCESS}}
export const authFail = (error) => {return {type: actionTypes.AUTH_FAIL, error: error}}


export const logout = ()=>{
    localStorage.removeItem('tokenBuddy')
    localStorage.removeItem('expirationDateBuddy')
    localStorage.removeItem('userIDBuddy')
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
            localStorage.setItem("tokenBuddy",res.token)
            localStorage.setItem("userIDBuddy",res.userId)
            const expirationDate = new Date(new Date().getTime()+ res.expirationTime.toString()*3600000)
            localStorage.setItem("expirationDateBuddy",expirationDate)
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
            localStorage.setItem("tokenBuddy",res.token)
            localStorage.setItem("expirationDateBuddy",expirationDate)
            localStorage.setItem("userIDBuddy",res.userId)
            dispatch(authSuccess(res.token,res.userId))
        })
        .catch(err=>{dispatch(authFail(err))})
    }
}



export const checkSignIn = () => {
    return dispatch => {
        const token = localStorage.getItem('tokenBuddy');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDateBuddy'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userIDBuddy');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};