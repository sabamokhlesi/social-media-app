import * as actionTypes from './action-types'

export const postStart=() =>{return{type:actionTypes.POST_START}}
export const postFailed =(error) =>{return{type:actionTypes.POST_FAILED,error:error}}
export const postSuccess =(id,data) =>{return{type:actionTypes.POST_SUCCESSFUL,postId:id, postData:data }}

export const post = (postInfo,token) =>{
    return dispatch => {
        dispatch(postStart())
        fetch('http://localhost:8080/buddy/post', 
        // fetch('https://buddy-app-backend.herokuapp.com/buddy/post', 
            {method: 'POST',body:JSON.stringify(postInfo), headers: {Authorization: 'Bearer ' + token,'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {throw new Error('Creating the post failed!');}
            return res.json();
            })
        .then(res =>{dispatch(postSuccess(res.post._id,postInfo))})
        .catch(err=>{dispatch(postFailed(err))})
    }
}

export const deletePostStart=() =>{return{type:actionTypes.DELETE_POST_START}}
export const deletePostFailed =(error) =>{return{type:actionTypes.DELETE_POST_FAILED,error:error}}
export const deletePostSuccess =(id) =>{return{type:actionTypes.DELETE_POST_SUCCESSFUL,postId: id }
}
export const deletePost = (postId,token) =>{
    return dispatch => {
        dispatch(deletePostStart())
        
        fetch(`http://localhost:8080/buddy/post/${postId}`, {
        // fetch(`https://buddy-app-backend.herokuapp.com/buddy/post/${postId}`, {
            method: 'DELETE',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Deleting a post failed!');}
        return res.json();
        })
        .then(res =>{dispatch(deletePostSuccess(postId))})
        .catch(err=>{dispatch(deletePostFailed(err))})
    }
}

export const fetchpostsSuccess = (posts) =>{return{type: actionTypes.FETCH_POSTS_SUCCESS,posts: posts }}
export const fetchpostsFail = (error) => {return{type: actionTypes.FETCH_POSTS_FAILED,error: error}}
export const fetchpostsStart =() => {return{type: actionTypes.FETCH_POSTS_START}}

export const fetchposts = (token,userId) =>{
    return dispatch => {
        dispatch(fetchpostsStart())
        
        const toDate = (new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()).slice(-2)).toString()
        const fromDate = (
            (new Date().getMonth() !== 0?new Date().getFullYear():new Date().getFullYear()-1)+'-'
            +('0'+(new Date().getMonth()!==0? new Date().getMonth():12)).slice(-2)+'-01'
            ).toString()
            
        fetch(`http://localhost:8080/buddy/posts/${userId}?fromDate=${fromDate}&toDate=${toDate}`
        // fetch(`https://buddy-app-backend.herokuapp.com/buddy/posts/${userId}?fromDate=${fromDate}&toDate=${toDate}`
            ,{method: 'GET',headers: {Authorization: 'Bearer ' + token}})
            .then(res => {
                if (res.status !== 200) {throw new Error('Failed to fetch posts.')}
                return res.json();
            })
        .then(res=>{dispatch(fetchpostsSuccess(res.posts))})
        .catch(err=>dispatch(fetchpostsFail(err)))
    }
}


export const likePostStart=() =>{return{type:actionTypes.LIKE_POST_START}}
export const likePostFailed =(error) =>{return{type:actionTypes.LIKE_POST_FAILED,error:error}}
export const likePostSuccess =(id) =>{return{type:actionTypes.LIKE_POST_SUCCESSFUL,postId: id }}

export const likePost = (postId,token) =>{
    return dispatch => {
        dispatch(likePostStart())
        
        fetch(`http://localhost:8080/buddy/post/${postId}`, {
        // fetch(`https://buddy-app-backend.herokuapp.com/buddy/post/${postId}`, {
            method: 'PUT',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Deleting a post failed!');}
        return res.json();
        })
        .then(res =>{dispatch(likePostSuccess(postId))})
        .catch(err=>{dispatch(likePostFailed(err))})
    }
}

export const unlikePostStart=() =>{return{type:actionTypes.UNLIKE_POST_START}}
export const unlikePostFailed =(error) =>{return{type:actionTypes.UNLIKE_POST_FAILED,error:error}}
export const unlikePostSuccess =(id) =>{return{type:actionTypes.UNLIKE_POST_SUCCESSFUL,postId: id }}

export const unlikePost = (postId,token) =>{
    return dispatch => {
        dispatch(unlikePostStart())
        
        fetch(`http://localhost:8080/buddy/post/${postId}`, {
        // fetch(`https://buddy-app-backend.herokuapp.com/buddy/post/${postId}`, {
            method: 'PUT',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Deleting a post failed!');}
        return res.json();
        })
        .then(res =>{dispatch(unlikePostSuccess(postId))})
        .catch(err=>{dispatch(unlikePostFailed(err))})
    }
}