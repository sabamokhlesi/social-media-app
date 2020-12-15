import React from'react'
import './profile.scss'
import photo from '../../../images/avatar-preview.jpg'
import {FaPencilAlt} from "react-icons/fa"
import {NavLink,Route,Switch,Redirect} from 'react-router-dom'
import Spinner from '../../../components/spinner/spinner'

const profile = (props) => {
    const posts = 
    props.posts?
    <div className='profile-posts'>
        {props.posts.map(post=><div className='profile-post' style={{backgroundImage:`url(http://localhost:8080/${post.imageUrl})`}} onClick={props.postShow} key={post._id} id={post._id}>
        </div>)}
    </div>:<div style={{textAlign:'center',padding:'1rem'}}>No post found</div>

    return (
        
        <div className='profile'>
            {props.loading && !props.userName?
            <Spinner/>
            :
            <React.Fragment>
                <div className='profile-top'>
                    <div className='profile-top-img-box'><img src={props.userInfo.avatarImgUrl === ''?photo:'http://localhost:8080/'+props.userInfo.avatarImgUrl} alt="profile"/></div>
                    <div className='profile-top-name'>
                        <div className='profile-top-items-box'>
                            <div className='profile-top-items-left'>
                                <h2>{props.userInfo.name}</h2>
                                <p>{props.userInfo.bio}</p>
                            </div>
                            {props.userInfo.userName === props.currentUserUserName?
                            <button onClick={props.onEditProfileClick} ><FaPencilAlt/> Edit profile</button>:null}
                        </div>
                        {props.userInfo.userName !== props.currentUserUserName?
                                <button onClick={props.followUnfollowClick} >
                                    {props.following?'Unfollow':'Follow'}
                                    </button>
                                :null
                            }
                    </div>
                    <div className='profile-nav'>
                        <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}`} exact className='profile-nav-item' >{props.userInfo.posts.length} posts</NavLink>
                        <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}/followers`} exact className='profile-nav-item' >234 followers</NavLink>
                        <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}/followings`} exact className='profile-nav-item' >198 followings</NavLink>
                    </div>
                </div>
                <div className='profile-body'>
                    <Switch>
                        <Route path={`/${props.userInfo.userName}`} exact render={() => posts}/>
                        <Route path={`/${props.userInfo.userName}/followers`} exact render={() => <div>followers</div>}/>
                        <Route path={`/${props.userInfo.userName}/followings`} exact render={() => <div>followings</div>}/>
                        <Redirect to={`/${props.userInfo.userName}`}/>
                    </Switch>
                </div>
            </React.Fragment>
        }
        </div>
            
    )
}

export default profile