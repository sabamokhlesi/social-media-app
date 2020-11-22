import React from'react'
import NavBar from './nav/navbar'
import {connect} from 'react-redux'
import {Route,Switch,Redirect} from 'react-router-dom'
import * as actions from '../../store/actions/index'
import Home from './home/home'
import Profile from './profile/profile'
import CreatePostPage from './create-post-page/create-post-page'
import SearchPage from './search-page/search-page'

class Account extends React.Component{
    render(){
        return (
            <div>
                <NavBar onLogOutClick={this.props.onLogOut}/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/profile' exact component={Profile} />
                    <Route path='/create-post' exact component={CreatePostPage} />
                    <Route path='/search' exact component={SearchPage}/>
                    <Redirect to='/'/>
                </Switch>
            </div>
        )
    }
    
}

const mapDispatchToProps = dispatch =>{
    return{
    onLogOut : () => dispatch(actions.logout())
}}
export default connect(null,mapDispatchToProps)(Account)