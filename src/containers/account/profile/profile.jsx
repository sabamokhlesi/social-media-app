import React from'react'
import './profile.scss'
import photo from '../../../images/avatar-preview.jpg'
import {FaPencilAlt} from "react-icons/fa"
import {NavLink,Route,Switch,Redirect} from 'react-router-dom'

const profile = (props) => {
    return (
        <div className='profile'>
            <div className='profile-top'>
                <div className='profile-top-img-box'><img src={props.userInfo.avatarImgUrl === ''?photo:'http://localhost:8080/'+props.userInfo.avatarImgUrl} alt="profile"/></div>
                <div className='profile-top-name'>
                    <p>{props.userInfo.bio}</p>
                    <h2>{props.userInfo.name}</h2>
                    <button onClick={props.onEditProfileClick} ><FaPencilAlt/> Edit profile</button>
                </div>
                <div className='profile-nav'>
                    <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}`} exact className='profile-nav-item' >35 posts</NavLink>
                    <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}/followers`} exact className='profile-nav-item' >234 followers</NavLink>
                    <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}/followings`} exact className='profile-nav-item' >198 followings</NavLink>
                </div>
            </div>
            <div className='profile-body'>
                <Switch>
                    <Route path={`/${props.userInfo.userName}`} exact render={() => <div>posts</div>}/>
                    <Route path={`/${props.userInfo.userName}/followers`} exact render={() => <div>followers</div>}/>
                    <Route path={`/${props.userInfo.userName}/followings`} exact render={() => <div>followings</div>}/>
                    <Redirect to={`/${props.userInfo.userName}`}/>
                </Switch>
            </div>
        </div>
    )
}

export default profile