import React from'react'
import './profile.scss'
import photo from '../../../images/photo.jpg'
import {FaPencilAlt} from "react-icons/fa"
import {NavLink,Route,Switch,Redirect} from 'react-router-dom'

const profile = (props) => {
    return (
        <div className='profile'>
            <div className='profile-top'>
                <div className='profile-top-img-box'><img src={photo} alt="profile"/></div>
                <div className='profile-top-name'>
                    <h2>Saba Mokhlesi</h2>
                    <button onClick={props.onEditProfileClick} ><FaPencilAlt/> Edit profile</button>
                </div>
                <div className='profile-nav'>
                    <NavLink activeClassName='profile-nav-item-active' to='/profile' exact className='profile-nav-item' >35 posts</NavLink>
                    <NavLink activeClassName='profile-nav-item-active' to='/profile/followers' exact className='profile-nav-item' >234 followers</NavLink>
                    <NavLink activeClassName='profile-nav-item-active' to='/profile/followings' exact className='profile-nav-item' >198 followings</NavLink>
                    <NavLink activeClassName='profile-nav-item-active' to='/profile/communities' exact className='profile-nav-item' >7 communities</NavLink>
                </div>
            </div>
            <div className='profile-body'>
                <Switch>
                    <Route path='/profile' exact render={() => <div>posts</div>}/>
                    <Route path='/profile/followers' exact render={() => <div>followers</div>}/>
                    <Route path='/profile/followings' exact render={() => <div>followings</div>}/>
                    <Route path='/profile/communities' exact render={() => <div>communities</div>}/>
                    <Redirect to='/profile'/>
                </Switch>
            </div>
        </div>
    )
}

export default profile