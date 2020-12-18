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
    }
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_USERINFO_START:return{...state, loading:true, error:null}
        case actionTypes.FETCH_USERINFO_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.FETCH_USERINFO_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.FOLLOW_UNFOLLOW_START:return{...state, loading:true, error:null}
        case actionTypes.FOLLOW_UNFOLLOW_SUCCESS:
            const copiedState={...state}
            copiedState.loading = false
            if(action.action === 'follow'){
                copiedState.userInfo.followings.push(action.followingUserId)
                copiedState.otherUser.followers.push(...copiedState.userInfo._id)
            } else{
                copiedState.userInfo.followings.splice(copiedState.userInfo.followings.findIndex(followerId => followerId === action.followerUserId),1)
                copiedState.otherUser.followers.splice(copiedState.otherUser.followers.findIndex(followerId => followerId === action.userId),1)
            }
            return copiedState
        case actionTypes.FOLLOW_UNFOLLOW_FAIL:return{...state, loading:false, error:action.error}

        case actionTypes.SAVE_SETTINGS_CHANGES_START:return{...state, loading:true, error:null}
        case actionTypes.SAVE_SETTINGS_CHANGES_SUCCESS:return{...state, userInfo:{...state.userInfo,bio:action.newInfo.bio,name:action.newInfo.name,avatarImgUrl:action.newInfo.avatarImgUrl.size !== 0?action.newInfo.avatarImgUrl:state.userInfo.avatarImgUrl}, loading:false, error:null}
        case actionTypes.SAVE_SETTINGS_CHANGES_FAIL:return{...state, loading:false, error:action.error}

        case actionTypes.GET_USER_START:return{...state, loading:true, error:null}
        case actionTypes.GET_USER_SUCCESS:return{...state, otherUser:action.user, loading:false, error:null}
        case actionTypes.GET_USER_FAILED:return{...state, loading:false, error:action.error}

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