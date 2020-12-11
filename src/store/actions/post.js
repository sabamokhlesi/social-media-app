import * as actionTypes from './action-types'

export const postStart=() =>{return{type:actionTypes.POST_START}}
export const postFailed =(error) =>{return{type:actionTypes.POST_FAILED,error:error}}
export const postSuccess =(postInfo) =>{return{type:actionTypes.POST_SUCCESSFUL,postInfo:postInfo }}

export const createPost = (postInfo,token) =>{
    const formData = new FormData();
    formData.append('caption', postInfo.caption)
    formData.append('image', postInfo.image)
    return dispatch => {
        dispatch(postStart())
        fetch('http://localhost:8080/account/post', 
        // fetch('https://buddy-app-backend.herokuapp.com/account/post', 
            {method: 'POST',body:formData, headers: {Authorization: 'Bearer ' + token}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {throw new Error('Creating the post failed!');}
            return res.json();
            })
        .then(res =>{
            // console.log(res.post)
            // const image = 'http://localhost:8080/' + res.post.imageUrl
            // console.log(image)
            dispatch(postSuccess(res.post))
        })
        .catch(err=>{dispatch(postFailed(err))})
    }
}


export const deletePostStart=() =>{return{type:actionTypes.DELETE_POST_START}}
export const deletePostFailed =(error) =>{return{type:actionTypes.DELETE_POST_FAILED,error:error}}
export const deletePostSuccess =(id) =>{return{type:actionTypes.DELETE_POST_SUCCESSFUL,postId: id }}

export const deletePost = (postId,token) =>{
    return dispatch => {
        dispatch(deletePostStart())
        console.log(postId)
        fetch(`http://localhost:8080/account/post/${postId}`, {
        // fetch(`https://buddy-app-backend.herokuapp.com/account/post/${postId}`, {
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


export const fetchPostsSuccess = (posts) =>{return{type: actionTypes.FETCH_POSTS_SUCCESS,posts: posts }}
export const fetchPostsFail = (error) => {return{type: actionTypes.FETCH_POSTS_FAILED,error: error}}
export const fetchPostsStart =() => {return{type: actionTypes.FETCH_POSTS_START}}

export const fetchPosts = (token,userId) =>{
    return dispatch => {
        dispatch(fetchPostsStart())
            
        fetch(`http://localhost:8080/account/posts/${userId}`
        // fetch(`https://buddy-app-backend.herokuapp.com/account/posts/${userId}?fromDate=${fromDate}&toDate=${toDate}`
            ,{method: 'GET',headers: {Authorization: 'Bearer ' + token}})
            .then(res => {
                if (res.status !== 200) {throw new Error('Failed to fetch posts.')}
                return res.json();
            })
        .then(res=>{dispatch(fetchPostsSuccess(res.posts))})
        .catch(err=>dispatch(fetchPostsFail(err)))
    }
}


export const likeDislikePostStart=() =>{return{type:actionTypes.LIKEDISLIKE_POST_START}}
export const likeDislikePostFailed =(error) =>{return{type:actionTypes.LIKEDISLIKE_POST_FAILED,error:error}}
export const likeDislikePostSuccess =(postId,userId,action) =>{return{type:actionTypes.LIKEDISLIKE_POST_SUCCESSFUL,postId: postId,userId:userId,action:action}}

export const postLikeDislike = (action,postId,userId,token) =>{
    return dispatch => {
        dispatch(likeDislikePostStart())
        
        fetch(`http://localhost:8080/account/post/${postId}?action=${action}&userId=${userId}`, {
        // fetch(`https://buddy-app-backend.herokuapp.com/account/post/${postId}`, {
            method: 'PUT',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Deleting a post failed!');}
        return res.json();
        })
        .then(res =>{dispatch(likeDislikePostSuccess(postId))})
        .catch(err=>{dispatch(likeDislikePostFailed(err))})
    }
}


export const commentStart=() =>{return{type:actionTypes.COMMENT_START}}
export const commentFailed =(error) =>{return{type:actionTypes.COMMENT_FAILED,error:error}}
export const commentSuccess =(id,data) =>{return{type:actionTypes.COMMENT_SUCCESSFUL,commentId:id, commentData:data }}

export const comment = (commentInfo,token) =>{
    return dispatch => {
        dispatch(commentStart())
        fetch('http://localhost:8080/buddy/comment', 
        // fetch('https://buddy-app-backend.herokuapp.com/buddy/comment', 
            {method: 'POST',body:JSON.stringify(commentInfo), headers: {Authorization: 'Bearer' + token, 'Content-Type':'application/json'}})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {throw new Error('Creating the comment failed!');}
            return res.json();
            })
        .then(res =>{dispatch(commentSuccess(res.comment._id,commentInfo))})
        .catch(err=>{dispatch(commentFailed(err))})
    }
}


export const deleteCommentStart=() =>{return{type:actionTypes.DELETE_COMMENT_START}}
export const deleteCommentFailed =(error) =>{return{type:actionTypes.DELETE_COMMENT_FAILED,error:error}}
export const deleteCommentSuccess =(id) =>{return{type:actionTypes.DELETE_COMMENT_SUCCESSFUL,CommentId: id }}

export const deleteComment = (commentId,token) =>{
    return dispatch => {
        dispatch(deleteCommentStart())
        
        fetch(`http://localhost:8080/buddy/comment/${commentId}`, {
        // fetch(`https://buddy-app-backend.herokuapp.com/buddy/comment/${commentId}`, {
            method: 'DELETE',headers: {Authorization: 'Bearer ' + token}
        })
        .then(res => {
        if (res.status !== 200 && res.status !== 201) {throw new Error('Deleting a comment failed!');}
        return res.json();
        })
        .then(res =>{dispatch(deleteCommentSuccess(commentId))})
        .catch(err=>{dispatch(deleteCommentFailed(err))})
    }
}