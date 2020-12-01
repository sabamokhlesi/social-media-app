import * as actionTypes from '../actions/action-types'

const initialState ={
    posts:{},
    loading:false,
    error:null
}


const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_POSTS_START:return{...state, loading:true, error:null}
        case actionTypes.FETCH_POSTS_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.FETCH_POSTS_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.POST_START:return{...state, loading:false, error:null}
        case actionTypes.POST_SUCCESS:return{...state,...state.userInfo.followers.concat(action.followerUserId), loading:false, error:null}
        case actionTypes.POST_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.DELETE_POST_START:return{...state, loading:false, error:null}
        case actionTypes.DELETE_POST_SUCCESS:return{...state,...state.userInfo.followers.splice(state.userInfo.followers.findIndex(follower => follower.userId === action.followerUserId),1), loading:false, error:null}
        case actionTypes.DELETE_POST_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.LIKE_POST_START:return{...state, loading:true, error:null}
        case actionTypes.LIKE_POST_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.LIKE_POST_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.UNLIKE_POST_START:return{...state, loading:true, error:null}
        case actionTypes.UNLIKE_POST_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.UNLIKE_POST_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.COMMENT_START:return{...state, loading:true, error:null}
        case actionTypes.COMMENT_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.COMMENT_FAILED:return{...state, loading:false, error:action.error}

        case actionTypes.DELETE_COMMENT_START:return{...state, loading:true, error:null}
        case actionTypes.DELETE_COMMENT_SUCCESS:return{...state, userInfo:action.userInfo, loading:false, error:null}
        case actionTypes.DELETE_COMMENT_FAILED:return{...state, loading:false, error:action.error}
        default: return state
    }
}

export default reducer