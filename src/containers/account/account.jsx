import React from'react'
import NavBar from './nav/navbar'
import {connect} from 'react-redux'
import {Route,Switch,Redirect} from 'react-router-dom'
import * as actions from '../../store/actions/index'
import Home from './home/home'
import Profile from './profile/profile'
import CreatePostPage from './create-post-page/create-post-page'
import EditProfile from './edit-profile/edit-profile'
import SearchPage from './search-page/search-page'
import MessageModal from '../../components/message-modal/message-modal.jsx'
import SinglePost from '../../components/post/post'

class Account extends React.Component{
    state={
        addPostOpen:false,
        editProfileOpen:false,
        showMessage:false,
        showSettingsMessage:false,
        showPost:false,
        singlePostId:''
    }

    componentDidMount(){
        this.props.onFetchPosts(this.props.token,this.props.userId)
        this.props.onFetchUserInfo(this.props.token,this.props.userId)
        this.props.onfetchFeedPosts(this.props.userId,this.props.token)
      }
      
      deleteHandler=()=>{
        this.setState({showPost:false})
        this.props.onDeletePost(this.state.singlePostId,this.props.token)
    }

    render(){
        return (
            <div>
                <NavBar userName={this.props.userInfo.userName} onLogOutClick={this.props.onLogOut} addPostClick={()=>this.setState({addPostOpen:true,editProfileOpen:false})}/>
                <Switch>
                    <Route path='/' exact render={()=><Home posts={this.props.feedPosts}/>}/>
                    <Route path={`/${this.props.userInfo.userName}`} 
                        render={() => 
                            <Profile 
                            following='follow'
                            followUnfollowClick={null}
                            loading={false}
                            userName={this.props.userInfo.userName}
                            currentUserUserName={this.props.userInfo.userName}
                            postShow={(event)=>this.setState({singlePostId:event.target.id,showPost:true})} 
                            posts={this.props.posts} 
                            userInfo={this.props.userInfo} 
                            onEditProfileClick={()=>this.setState({addPostOpen:false,editProfileOpen:true})}/>
                        }
                    />
                    <Route path='/search' exact render={()=><SearchPage onSearch={this.props.onSearchUsers} token={this.props.token} results={this.props.searchResult} loading={this.props.userLoading} gettingUser={this.props.onGetUser}/>}/>
                    <Route path='/:userName'
                        render={({match}) => 
                            <Profile 
                            followUnfollowClick={()=>this.props.onFollowUnfollow(this.props.userId,this.props.otherUser._id,this.props.userInfo.followings.includes(this.props.otherUser._id)?'unfollow':'follow',this.props.token)}
                            following={this.props.userInfo.followings.includes(this.props.otherUser._id)?'unfollow':'follow'}
                            loading={this.props.userLoading}
                            userName={this.props.otherUser.userName}
                            currentUserUserName={this.props.userInfo.userName}
                            postShow={(event)=>this.setState({singlePostId:event.target.id,showPost:true})} 
                            userInfo={this.props.otherUser}
                            posts={this.props.otherUser.posts}/>
                        }
                    />
                    <Redirect to='/'/>
                </Switch>
                {this.state.showMessage?
                    <MessageModal style={this.state.showMessage?{display:'flex'}:{display:'none'}} closeClicked={()=>this.setState({showMessage:false,addPostOpen:false})} loading={this.props.loading}>{this.props.postMessage}</MessageModal>:
                    <CreatePostPage style={this.state.addPostOpen?{display:'block'}:{display:'none'}} changeState={()=>this.setState({showMessage:true})} postClicked={this.props.onPostClicked} token={this.props.token}/>
                }
                {this.state.singlePostId!=='' && this.state.showPost?
                <SinglePost
                    feedPost={false}
                    profileClicked={()=>this.setState({showPost:false})}
                    deleteHandler={this.deleteHandler}
                    postInfo={this.props.posts.findIndex(post => post._id === this.state.singlePostId) !== -1?
                        this.props.posts[this.props.posts.findIndex(post => post._id === this.state.singlePostId)]
                        : this.props.otherUserPosts[this.props.otherUserPosts.findIndex(post => post._id === this.state.singlePostId)]
                }
                  style={this.state.showPost?{display:'flex',position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'35rem',zIndex:'120'}:{display:'none'}}
                />
                :null}
                <EditProfile style={this.state.editProfileOpen?{display:'block'}:{display:'none'}} userInfo={this.props.userInfo} saveSettingsClicked={this.props.onSaveSettingsClicked} changeState={()=>this.setState({editProfileOpen:false})} token={this.props.token} userId={this.props.userId}/>
                <div className="modal-overlay"  style={this.state.addPostOpen || this.state.editProfileOpen || this.state.showMessage || this.state.showPost?{display:"block"}:{display:'none'}} onClick={()=>this.setState({addPostOpen:false,editProfileOpen:false,showMessage:false,showPost:false})}></div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        token : state.auth.token,
        postMessage: state.post.message,
        loading:state.post.loading,
        userId:state.auth.userId,
        userInfo:state.user.userInfo,
        posts:state.post.posts,
        otherUser:state.user.otherUser,
        userLoading:state.user.loading,
        otherUserPosts:state.user.otherUser.posts,
        feedPosts:state.post.feedPosts,
        searchResult:state.user.searchedUsers,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
    onLogOut : () => dispatch(actions.logout())
    ,onPostClicked: (postInfo,token) => dispatch(actions.createPost(postInfo,token))
    ,onFetchPosts:(token,userId)=>{dispatch(actions.fetchPosts(token,userId))}
    ,onFetchUserInfo:(token,userId)=>{dispatch(actions.fetchUserInfo(token,userId))}
    ,onSaveSettingsClicked:(newInfo,token,userId)=>{dispatch(actions.saveChangedSettingsInfo(newInfo,token,userId))}
    ,onDeletePost : (postId,token) => dispatch(actions.deletePost(postId,token))
    ,onGetUser: (userName,token) => dispatch(actions.getUser(userName,token))
    ,onFollowUnfollow:(userId,followingUserId,action,token)=>dispatch(actions.followUnfollow(userId,followingUserId,action,token))
    ,onfetchFeedPosts: (userId,token)=>dispatch(actions.fetchFeedPosts(userId,token))
    ,onSearchUsers: (searchedKey,token)=>dispatch(actions.searchUsers(searchedKey,token))
}}


export default connect(mapStateToProps,mapDispatchToProps)(Account)