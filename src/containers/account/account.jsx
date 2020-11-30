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
            name:'saba-mokhlesi'
        }
    }
    render(){
        return (
            <div>
                <NavBar onLogOutClick={this.props.onLogOut} addPostClick={()=>this.setState({addPostOpen:true,editProfileOpen:false})}/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path={`/${this.state.user.name}`} render={() => <Profile user={this.state.user} onEditProfileClick={()=>this.setState({addPostOpen:false,editProfileOpen:true})}/>} />
                    <Route path='/search' exact component={SearchPage}/>
                    <Redirect to='/'/>
                </Switch>
                <CreatePostPage style={this.state.addPostOpen?{display:'block'}:{display:'none'}}/>
                <EditProfile style={this.state.editProfileOpen?{display:'block'}:{display:'none'}}/>
                <div className="modal-overlay"  style={this.state.addPostOpen || this.state.editProfileOpen?{display:"block"}:{display:'none'}} onClick={()=>this.setState({addPostOpen:false,editProfileOpen:false})}></div>
            </div>
        )
    }
    
}

const mapDispatchToProps = dispatch =>{
    return{
    onLogOut : () => dispatch(actions.logout())
}}
export default connect(null,mapDispatchToProps)(Account)