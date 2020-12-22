import React from'react'
import './home.scss'
import Post from '../../../components/post/post'
import photo from '../../../images/avatar-preview.jpg'
import { useHistory } from "react-router-dom"

const Home = (props)=>{
    const history = useHistory();
    const linkHandler = (userName)=>{
        props.gettingUser(userName,props.token)
        history.push('/'+userName)
         
        }

    return (
        <div className='home'>
            <div className='posts'>
                {props.posts.length>0?props.posts.map(post=><Post postInfo={post} deleteHandler={()=>{}} profileClicked={()=>{}} feedPost={true}/>):"No post to show!"}
            </div>
            <div className='home-right'> 
                <div className='home-right-top'>
                    <div className='search-result' onClick={()=>linkHandler(props.userInfo.userName)}>
                        <div className='search-result-img-box'><img src={props.userInfo.avatarImgUrl !== ''?'http://localhost:8080/'+props.userInfo.avatarImgUrl:photo} alt="Buddy user"/></div>
                        <h5>{props.userInfo.name !== ''? props.userInfo.name:props.userInfo.userName}</h5>
                        <p> (@{props.userInfo.userName})</p>
                    </div>
                </div>
                <div className='home-right-top'>
                    <p>Suggestions for you</p>
                    {props.suggestedUsers.length>0?
                        props.suggestedUsers.map(user=>
                            <div className='search-result' onClick={()=>linkHandler(user.userInfo.userName)}>
                                <div className='search-result-img-box'><img src={user.userInfo.avatarImgUrl !== ''?'http://localhost:8080/'+user.userInfo.avatarImgUrl:photo} alt="Buddy user"/></div>
                                <h5>{user.userInfo.name !== ''? user.userInfo.name:user.userInfo.userName}</h5>
                                <p> (@{user.userInfo.userName})</p>
                            </div>
                        ):'No new user to suggest'
                    }
                </div>
            </div>
        </div>
    )
}

export default Home