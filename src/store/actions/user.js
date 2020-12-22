import * as actionTypes from './action-types'

export const fetchUserInfoSuccess = (info) =>{return{type: actionTypes.FETCH_USERINFO_SUCCESS,userInfo: info }}
export const fetchUserInfoFail = (error) => {return{type: actionTypes.FETCH_USERINFO_FAILED,error: error}}
export const fetchUserInfoStart =() => {return{type: actionTypes.FETCH_USERINFO_START}}

export const fetchUserInfo = (token,userId) =>{
    return dispatch => {
        dispatch(fetchUserInfoStart())
        // fetch(`http://localhost:8080/account/user-info/${userId}`, {
        fetch(`https://socialmedia-backend.herokuapp.com/account/user-info/${userId}`, {
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
        // fetch(`http://localhost:8080/account/user-info/${userId}`, {
        fetch(`https://socialmedia-backend.herokuapp.com/account/user-info/${userId}`, {
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

export const followUnfollowSuccess = (userId,followingUserId,action) =>{return{type: actionTypes.FOLLOW_UNFOLLOW_SUCCESS,userId:userId,followingUserId: followingUserId,action:action }}
export const followUnfollowFail = (error) => {return{type: actionTypes.FOLLOW_UNFOLLOW_FAIL,error: error}}
export const followUnfollowStart =() => {return{type: actionTypes.FOLLOW_UNFOLLOW_START}}

export const followUnfollow =(userId,followingUserId,action,token)=>{
    return dispatch => {
        dispatch(followUnfollowStart())
        // fetch(`http://localhost:8080/account/followings/${userId}?action=${action}&followingUserId=${followingUserId}`, {
        fetch(`https://socialmedia-backend.herokuapp.com/account/followings/${userId}?action=${action}&followingUserId=${followingUserId}`, {
            method: 'PUT',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
            console.log('userId: ',userId,'followingUserId: ',followingUserId,'action: ',action,'token: ',token)
        if (res.status !== 200 && res.status !== 201) {throw new Error(action+'failed!');}
        return res.json();
        })
        .then(res =>{dispatch(followUnfollowSuccess(userId,followingUserId,action))})
        .catch(err=>{dispatch(followUnfollowFail(err))})
    }
}

export const getUserSuccess = (info) =>{return{type: actionTypes.GET_USER_SUCCESS,user: info }}
export const getUserFail = (error) => {return{type: actionTypes.GET_USER_FAILED,error: error}}
export const getUserStart =() => {return{type: actionTypes.GET_USER_START}}

export const getUser = (userName,token) =>{
    return dispatch => {
        dispatch(getUserStart())
        // fetch(`http://localhost:8080/feed/users/${userName}`, {
        fetch(`https://socialmedia-backend.herokuapp.com/feed/users/${userName}`, {
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


export const searchUsersSuccess = (info) =>{return{type: actionTypes.SEARCH_USERS_SUCCESS,users: info }}
export const searchUsersFail = (error) => {return{type: actionTypes.SEARCH_USERS_FAILED,error: error}}
export const searchUsersStart =() => {return{type: actionTypes.SEARCH_USERS_START}}

export const searchUsers = (searchedKey,token) =>{
    return dispatch => {
        dispatch(searchUsersStart())
        // fetch(`http://localhost:8080/feed/search-users/${searchedKey}`, {
        fetch(`https://socialmedia-backend.herokuapp.com/feed/search-users/${searchedKey}`, {
            method: 'GET',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Searching users failed!')}
        return res.json();
        })
        .then(res=>{
            dispatch(searchUsersSuccess(res.users))
        }).catch(err=>dispatch(searchUsersFail(err)))
    }
}

export const fetchSuggestedUsersSuccess = (info) =>{return{type: actionTypes.FETCH_SUGGESTED_USERS_SUCCESS,users: info }}
export const fetchSuggestedUsersFail = (error) => {return{type: actionTypes.FETCH_SUGGESTED_USERS_FAILED,error: error}}
export const fetchSuggestedUsersStart =() => {return{type: actionTypes.FETCH_SUGGESTED_USERS_START}}

export const fetchSuggestedUsers = (token,userId) =>{
    return dispatch => {
        dispatch(fetchSuggestedUsersStart())
        // fetch(`http://localhost:8080/feed/get-users/${userId}`, {
        fetch(`https://socialmedia-backend.herokuapp.com/feed/get-users/${userId}`, {
            method: 'GET',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('geting users failed!')}
        return res.json();
        })
        .then(res=>{
            dispatch(fetchSuggestedUsersSuccess(res.users))
        }).catch(err=>dispatch(fetchSuggestedUsersFail(err)))
    }
}
