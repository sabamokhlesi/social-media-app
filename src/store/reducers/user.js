import * as actionTypes from '../actions/action-types'

const initialState ={
    userInfo:{
        userId:'',
        userName:'',
        name:'',
        Bio:'',
        followers:{},
        followings:{},
        posts:{}
    },
    loading:false,
    error:null
}


const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_USERINFO_START:return{...state, loading:true, error:null}
        case actionTypes.FETCH_USERINFO_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.FETCH_USERINFO_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.FOLLOW_START:return{...state, loading:false, error:null}
        case actionTypes.FOLLOW_SUCCESS:return{...state,...state.userInfo.followers.concat(action.followerUserId), loading:false, error:null}
        case actionTypes.FOLLOW_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.UNFOLLOW_START:return{...state, loading:false, error:null}
        case actionTypes.UNFOLLOW_SUCCESS:return{...state,...state.userInfo.followers.splice(state.userInfo.followers.findIndex(follower => follower.userId === action.followerUserId),1), loading:false, error:null}
        case actionTypes.UNFOLLOW_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.SAVE_SETTINGS_CHANGES_START:return{...state, loading:true, error:null}
        case actionTypes.SAVE_SETTINGS_CHANGES_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.SAVE_SETTINGS_CHANGES_FAILED:return{...state, loading:false, error:action.error}
        default: return state
    }
}

export default reducer