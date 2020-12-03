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

class Account extends React.Component{
    state={
        addPostOpen:false,
        editProfileOpen:false,
        user:{
            userName:'saba-mokhlesi'
        }
    }

    // componentDidMount(){
    //     this.props.onFetchUserInfo(this.props.token,this.props.userId)
    //   }

    render(){
        return (
            <div>
                <NavBar onLogOutClick={this.props.onLogOut} addPostClick={()=>this.setState({addPostOpen:true,editProfileOpen:false})}/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path={`/${this.state.user.userName}`} render={() => <Profile user={this.state.user} onEditProfileClick={()=>this.setState({addPostOpen:false,editProfileOpen:true})}/>} />
                    <Route path='/search' exact component={SearchPage}/>
                    <Redirect to='/'/>
                </Switch>
                <CreatePostPage style={this.state.addPostOpen?{display:'block'}:{display:'none'}} postClicked={this.props.onPostClicked} token={this.props.token}/>
                <EditProfile style={this.state.editProfileOpen?{display:'block'}:{display:'none'}}/>
                <div className="modal-overlay"  style={this.state.addPostOpen || this.state.editProfileOpen?{display:"block"}:{display:'none'}} onClick={()=>this.setState({addPostOpen:false,editProfileOpen:false})}></div>
            </div>
        )
    }
    
}

const mapStateToProps = state =>{
    return{
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
    onLogOut : () => dispatch(actions.logout())
    ,onPostClicked: (postInfo,token) => dispatch(actions.createPost(postInfo,token))
    // ,onFetchUserInfo:(token,userId)=>{dispatch(actions.fetchUserInfo(token,userId))}
}}


export default connect(mapStateToProps,mapDispatchToProps)(Account)