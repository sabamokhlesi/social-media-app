import React from'react'
import './profile.scss'
import photo from '../../../images/avatar-preview.jpg'
import {FaPencilAlt} from "react-icons/fa"
import {NavLink,Route,Switch,Redirect} from 'react-router-dom'
import Spinner from '../../../components/spinner/spinner'
import { useHistory } from "react-router-dom"

const Profile = (props) => {

    const history = useHistory();
    const linkHandler = (userName)=>{
        props.gettingUser(userName,props.token)
        history.push('/'+userName)
        }

    const posts = 
    props.posts?
    <div className='profile-posts'>
        {props.posts.map(post=><div className='profile-post' style={{backgroundImage:`url(http://localhost:8080/${post.imageUrl})`}} onClick={props.postShow} key={post._id} id={post._id}>
        </div>)}
    </div>:<div style={{textAlign:'center',padding:'1rem'}}>No post found</div>

    const followers = 
    props.userInfo.followers && props.userInfo.followers !== []?
    <div className='profile-followers'>
        {props.userInfo.followers.map(follower=>
            <div className='search-result' onClick={()=>linkHandler(follower.userInfo.userName)}>
                <div className='search-result-img-box'><img src={follower.userInfo.avatarImgUrl !== ''?'http://localhost:8080/'+follower.userInfo.avatarImgUrl:photo} alt="Buddy user"/></div>
                <h5>{follower.userInfo.name !== ''? follower.userInfo.name:follower.userInfo.userName}</h5>
                <p> (@{follower.userInfo.userName})</p>
            </div>
        )}
    </div>:<div style={{textAlign:'center',padding:'1rem'}}>No follower found</div>

    const followings = 
    props.userInfo.followings && props.userInfo.followings !== []?
    <div className='profile-followings'>
        {props.userInfo.followings.map(following=>
            <div className='search-result' onClick={()=>linkHandler(following.userInfo.userName)}>
                <div className='search-result-img-box'><img src={following.userInfo.avatarImgUrl !== ''?'http://localhost:8080/'+following.userInfo.avatarImgUrl:photo} alt="Buddy user"/></div>
                <h5>{following.userInfo.name !== ''? following.userInfo.name:following.userInfo.userName}</h5>
                <p> (@{following.userInfo.userName})</p>
            </div>
        )}
    </div>:<div style={{textAlign:'center',padding:'1rem'}}>No following found</div>

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
                                    {props.following}
                                    </button>
                                :null
                            }
                    </div>
                    <div className='profile-nav'>
                        <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}`} exact className='profile-nav-item' >{props.userInfo.posts.length} posts</NavLink>
                        <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}/followers`} exact className='profile-nav-item' >{props.userInfo.followers.length} followers</NavLink>
                        <NavLink activeClassName='profile-nav-item-active' to={`/${props.userInfo.userName}/followings`} exact className='profile-nav-item' >{props.userInfo.followings.length} followings</NavLink>
                    </div>
                </div>
                <div className='profile-body'>
                    <Switch>
                        <Route path={`/${props.userInfo.userName}`} exact render={() => posts}/>
                        <Route path={`/${props.userInfo.userName}/followers`} exact render={() => followers}/>
                        <Route path={`/${props.userInfo.userName}/followings`} exact render={() => followings}/>
                        <Redirect to={`/${props.userInfo.userName}`}/>
                    </Switch>
                </div>
            </React.Fragment>
        }
        </div>
            
    )
}

export default Profile