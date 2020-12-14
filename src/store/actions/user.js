import * as actionTypes from './action-types'

export const fetchUserInfoSuccess = (info) =>{return{type: actionTypes.FETCH_USERINFO_SUCCESS,userInfo: info }}
export const fetchUserInfoFail = (error) => {return{type: actionTypes.FETCH_USERINFO_FAILED,error: error}}
export const fetchUserInfoStart =() => {return{type: actionTypes.FETCH_USERINFO_START}}

export const fetchUserInfo = (token,userId) =>{
    return dispatch => {
        dispatch(fetchUserInfoStart())
        fetch(`http://localhost:8080/account/user-info/${userId}`, {
        // fetch(`https://social-media-app-backend.herokuapp.com/account/user-info/${userId}`, {
            method: 'GET',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Fetching information failed!')}
        return res.json();
        })
        .then(res=>{
            dispatch(fetchUserInfoSuccess(res.userInfo))
        }).catch(err=>dispatch(fetchUserInfoFail(err)))
    }
}


export const saveChangedSettingsInfoSuccess = (newInfo) =>{return{type: actionTypes.SAVE_SETTINGS_CHANGES_SUCCESS,newInfo: newInfo }}
export const saveChangedSettingsInfoFail = (error) => {return{type: actionTypes.SAVE_SETTINGS_CHANGES_FAIL,error: error}}
export const saveChangedSettingsInfoStart =() => {return{type: actionTypes.SAVE_SETTINGS_CHANGES_START}}

export const saveChangedSettingsInfo =(newInfo,token,userId)=>{
    const formData = new FormData();
    formData.append('name', newInfo.name)
    formData.append('bio', newInfo.bio)
    formData.append('image', newInfo.avatarImgUrl)
    return dispatch => {
        dispatch(saveChangedSettingsInfoStart())
        fetch(`http://localhost:8080/account/user-info/${userId}`, {
        // fetch(`https://social-media-app-backend.herokuapp.com/account/user-info/${userId}`, {
            method: 'PUT',body:formData ,headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Updating information failed!');}
        return res.json();
        })
        .then(res =>{dispatch(saveChangedSettingsInfoSuccess(res.userInfo))})
        .catch(err=>{dispatch(saveChangedSettingsInfoFail(err))})
    }
}


export const followSuccess = (newFollowing) =>{return{type: actionTypes.FOLLOW_SUCCESS,newFollowing: newFollowing }}
export const followFail = (error) => {return{type: actionTypes.FOLLOW_FAILED,error: error}}
export const followStart =() => {return{type: actionTypes.FOLLOW_START}}

export const follow =(newFollowing,token,userId)=>{
    return dispatch => {
        dispatch(followStart())
        fetch(`http://localhost:8080/social-media/user-followings/${userId}`, {
        // fetch(`https://social-media-app-backend.herokuapp.com/social-media/user-followings/${userId}`, {
            method: 'put',body:JSON.stringify(newFollowing) ,headers: {Authorization: 'Bearer ' + token,'Content-Type': 'application/json'}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Following new user failed!');}
        return res.json();
        })
        .then(res =>{dispatch(followSuccess(newFollowing))})
        .catch(err=>{dispatch(followFail(err))})
    }
}



export const unfollowSuccess = (unfollowedUser) =>{return{type: actionTypes.UNFOLLOW_SUCCESS,unfollowedUser: unfollowedUser }}
export const unfollowFail = (error) => {return{type: actionTypes.UNFOLLOW_FAIL,error: error}}
export const unfollowStart =() => {return{type: actionTypes.UNFOLLOW_START}}

export const unfollow =(unfollowedUser,token,userId)=>{
    return dispatch => {
        dispatch(unfollowStart())
        fetch(`http://localhost:8080/social-media/user-followings/${userId}`, {
        // fetch(`https://social-media-app-backend.herokuapp.com/social-media/user-followings/${userId}`, {
            method: 'DELETE',body:JSON.stringify(unfollowedUser) ,headers: {Authorization: 'Bearer ' + token,'Content-Type': 'application/json'}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Unfollowing failed!');}
        return res.json();
        })
        .then(res =>{dispatch(unfollowSuccess(unfollowedUser))})
        .catch(err=>{dispatch(unfollowFail(err))})
    }
}

export const getUserSuccess = (info) =>{return{type: actionTypes.GET_USER_SUCCESS,user: info }}
export const getUserFail = (error) => {return{type: actionTypes.GET_USER_FAILED,error: error}}
export const getUserStart =() => {return{type: actionTypes.GET_USER_START}}

export const getUser = (userName,token) =>{
    return dispatch => {
        dispatch(getUserStart())
        fetch(`http://localhost:8080/users/${userName}`, {
        // fetch(`https://social-media-app-backend.herokuapp.com/users/${userName}`, {
            method: 'GET',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Fetching the user failed!')}
        return res.json();
        })
        .then(res=>{
            dispatch(getUserSuccess(res.userInfo))
        }).catch(err=>dispatch(getUserFail(err)))
    }
}
