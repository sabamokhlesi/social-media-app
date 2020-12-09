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

class Account extends React.Component{
    state={
        addPostOpen:false,
        editProfileOpen:false,
        showMessage:false,
        showSettingsMessage:false,
        user:{
            userName:'saba-mokhlesi'
        }
    }

    componentDidMount(){
        this.props.onFetchPosts(this.props.token,this.props.userId)
        this.props.onFetchUserInfo(this.props.token,this.props.userId)
      }

      componentDidUpdate(){console.log(this.props.posts[0].imageUrl)}
    render(){
        return (
            <div>
                <NavBar onLogOutClick={this.props.onLogOut} addPostClick={()=>this.setState({addPostOpen:true,editProfileOpen:false})}/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path={`/${this.props.userInfo.userName}`} render={() => 
                        <Profile posts={this.props.posts} userInfo={this.props.userInfo} onEditProfileClick={()=>this.setState({addPostOpen:false,editProfileOpen:true})}/>}/>
                    <Route path='/search' exact component={SearchPage}/>
                    <Redirect to='/'/>
                </Switch>
                {this.state.showMessage?
                    <MessageModal style={this.state.showMessage?{display:'flex'}:{display:'none'}} closeClicked={()=>this.setState({showMessage:false,addPostOpen:false})} loading={this.props.loading}>{this.props.postMessage}</MessageModal>:
                    <CreatePostPage style={this.state.addPostOpen?{display:'block'}:{display:'none'}} changeState={()=>this.setState({showMessage:true})} postClicked={this.props.onPostClicked} token={this.props.token}/>
                }
                <EditProfile style={this.state.editProfileOpen?{display:'block'}:{display:'none'}} userInfo={this.props.userInfo} saveSettingsClicked={this.props.onSaveSettingsClicked} changeState={()=>this.setState({editProfileOpen:false})} token={this.props.token} userId={this.props.userId}/>
                <div className="modal-overlay"  style={this.state.addPostOpen || this.state.editProfileOpen || this.state.showMessage?{display:"block"}:{display:'none'}} onClick={()=>this.setState({addPostOpen:false,editProfileOpen:false,showMessage:false})}></div>
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
        posts:state.post.posts
    }
}

const mapDispatchToProps = dispatch =>{
    return{
    onLogOut : () => dispatch(actions.logout())
    ,onPostClicked: (postInfo,token) => dispatch(actions.createPost(postInfo,token))
    ,onFetchPosts:(token,userId)=>{dispatch(actions.fetchPosts(token,userId))}
    ,onFetchUserInfo:(token,userId)=>{dispatch(actions.fetchUserInfo(token,userId))}
    ,onSaveSettingsClicked:(newInfo,token,userId)=>{dispatch(actions.saveChangedSettingsInfo(newInfo,token,userId))}
}}


export default connect(mapStateToProps,mapDispatchToProps)(Account)