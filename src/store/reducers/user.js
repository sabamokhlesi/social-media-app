import * as actionTypes from '../actions/action-types'

const initialState ={
    userInfo:{
        _id:'',
        userName:'',
        name:'',
        bio:'',
        avatarImgUrl:'',
        followers:[],
        followings:[],
        posts:[]
    },
    loading:false,
    error:null,
    otherUser:{
        posts:[]
    },
    searchedUsers:[],
    suggestedUsers:[]
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_USERINFO_START:return{...state, loading:true, error:null}
        case actionTypes.FETCH_USERINFO_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.FETCH_USERINFO_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.SEARCH_USERS_START:return{...state, loading:true, error:null, searchedUsers:[]}
        case actionTypes.SEARCH_USERS_SUCCESS:return{...state, searchedUsers:action.users.filter(user=>user.userInfo.userName!== state.userInfo.userName), loading:false, error:null}
        case actionTypes.SEARCH_USERS_FAILED:return{...state, loading:false, error:action.error, searchedUsers:[]}

        case actionTypes.FOLLOW_UNFOLLOW_START:return{...state, loading:true, error:null}
        case actionTypes.FOLLOW_UNFOLLOW_SUCCESS:
            const copiedState={...state}
            if(action.action === 'follow'){
                copiedState.userInfo.followings.unshift({_id:action.followingUserId,userInfo:{userName:copiedState.otherUser.userName,avatarImgUrl:copiedState.otherUser.avatarImgUrl,name:copiedState.otherUser.name}})
                copiedState.otherUser.followers.unshift({_id:copiedState.userInfo._id,userInfo:{userName:copiedState.userInfo.userName,avatarImgUrl:copiedState.userInfo.avatarImgUrl,name:copiedState.userInfo.name}})
            } else{
                copiedState.userInfo.followings.splice(copiedState.userInfo.followings.findIndex(followerId => followerId._id === action.followingUserId),1)
                // copiedState.userInfo.followings.filter(following => following._id !== action.followingUserId)
                // copiedState.otherUser.followers.filter(follower => follower._id !== action.userId)
                copiedState.otherUser.followers.splice(copiedState.otherUser.followers.findIndex(followerId => followerId._id === action.userId),1)
            }
            copiedState.loading = false
            return copiedState
        case actionTypes.FOLLOW_UNFOLLOW_FAIL:return{...state, loading:false, error:action.error}

        case actionTypes.SAVE_SETTINGS_CHANGES_START:return{...state, loading:true, error:null}
        case actionTypes.SAVE_SETTINGS_CHANGES_SUCCESS:return{...state, userInfo:{...state.userInfo,bio:action.newInfo.bio,name:action.newInfo.name,avatarImgUrl:action.newInfo.avatarImgUrl.size !== 0?action.newInfo.avatarImgUrl:state.userInfo.avatarImgUrl}, loading:false, error:null}
        case actionTypes.SAVE_SETTINGS_CHANGES_FAIL:return{...state, loading:false, error:action.error}

        case actionTypes.GET_USER_START:return{...state, loading:true, error:null,otherUser:{posts:[]}}
        case actionTypes.GET_USER_SUCCESS:return{...state, otherUser:action.user, loading:false, error:null}
        case actionTypes.GET_USER_FAILED:return{...state, loading:false, error:action.error,otherUser:{posts:[]}}

        case actionTypes.FETCH_SUGGESTED_USERS_START:return{...state, loading:true, error:null,suggestedUsers:[]}
        case actionTypes.FETCH_SUGGESTED_USERS_SUCCESS:return{...state, suggestedUsers:action.users, loading:false, error:null}
        case actionTypes.FETCH_SUGGESTED_USERS_FAILED:return{...state, loading:false, error:action.error,suggestedUsers:[]}

        case actionTypes.COMMENT_OTHER_SUCCESSFUL:
            const newState ={...state}
            const postIndex = newState.otherUser.posts.findIndex(post => post._id === action.postId)
            newState.otherUser.posts[postIndex].comments.push(action.commentData)
            newState.loading=true
            newState.error = null
            return newState
        default: return state
    }
}

export default reducer