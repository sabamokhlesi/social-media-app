import React from'react'
import './post.scss'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import photo from '../../images/avatar-preview.jpg'
import { FaHeart,FaRegComment,FaRegHeart,FaEllipsisV } from "react-icons/fa"
import { withRouter } from "react-router-dom";

class Post extends React.Component {

    state={
        liked:false,
        postId:'',
        deleteOpen:false,
        comment:''
    }
    componentDidMount(){
        this.setState({liked:this.props.postInfo.likes.findIndex(userId=>userId === this.props.userId) !== -1})
    }
    postCommentHandler= event => {
        event.preventDefault()
        const commentData={
            comment:this.state.comment,
            avatarImgUrl:this.props.userInfo.avatarImgUrl,
            name:this.props.userInfo.name,
            userName:this.props.userInfo.userName
        }
        this.props.onPostComment(this.props.postInfo._id,this.props.postInfo.creator._id,this.props.userId,commentData,this.props.token,this.props.feedPost)
        this.form.reset()
    }
    userProfileHandler = (userName)=>{
        this.props.onGetUser(userName,this.props.token)
        this.props.history.push('/'+userName)
        this.props.profileClicked()
        }
    render(){
        const serverUrl = 'https://socialmedia-backend.herokuapp.com/'
        // const serverUrl = 'http://localhost:8080/'

        let count = 0 
        let timer = 0
        const onDoubleClick=()=>{
            if(count===0){
                count++
                timer = setTimeout(function() {
                    count = 0
                    },200)
            }
            else if(count === 1){
                count=0
                clearTimeout(timer)
                this.props.onPostLikeDislike(this.state.liked?'unlike':'like',this.props.postInfo._id,this.props.userId,this.props.token)
                this.state.liked? this.setState({liked:false}):this.setState({liked:true})
            }
        }
        return (
            <div onClick={onDoubleClick} className='post' style={this.props.style}>
                <div className='post-top'>
                    <div className='post-top-left' onClick={()=>this.userProfileHandler(this.props.postInfo.creator.userInfo.userName)}>
                        <div className='post-top-img-box'><img src={this.props.postInfo.creator.userInfo.avatarImgUrl !== ''?serverUrl+this.props.postInfo.creator.userInfo.avatarImgUrl:photo} alt="Jane Smith"/></div>
                        <h4>{this.props.postInfo.creator.userInfo.name!== ''?this.props.postInfo.creator.userInfo.name:this.props.postInfo.creator.userInfo.userName}</h4>
                    </div>
                    <div className='post-top-delete-box' style={this.props.postInfo.creator._id === this.props.userId? {display:'block'}:{display:'none'}}>
                        <FaEllipsisV onClick={()=>this.setState(this.state.deleteOpen?{deleteOpen:false}:{deleteOpen:true})}/>
                        <div style={this.state.deleteOpen?{display:'block'}:{display:'none'}} onClick={this.props.deleteHandler} className='post-top-delete'>delete post</div>
                    </div>
                </div>
                <img className='post-photo' src={serverUrl+this.props.postInfo.imageUrl} alt="example"/>
                <div className='post-likebar'>
                    {!this.state.liked?<FaRegHeart onClick={onDoubleClick}/>:<FaHeart onClick={onDoubleClick}/>}
                    <FaRegComment/>
                </div>
                <div className='post-caption'>
                    <h4 onClick={()=>this.userProfileHandler(this.props.postInfo.creator.userInfo.userName)}>{this.props.postInfo.creator.userInfo.name !== ''?this.props.postInfo.creator.userInfo.name:this.props.postInfo.creator.userInfo.userName}</h4>
                    <p>{this.props.postInfo.caption}</p>
                </div>
                <div className='post-comments'>
                    <h4>{(this.props.postInfo.comments.length).toString()} {+this.props.postInfo.comments.length>1?'comments':'comment'}</h4>
                    <div className='post-comments-main'>
                        {this.props.postInfo.comments.map(comment=>{return(
                            <div className='post-comment'>
                                <div className='post-comment-title' onClick={()=>this.userProfileHandler(comment.userId.userInfo.userName)}>
                                    <div className='post-comment-img-box'><img src={serverUrl+comment.userId.userInfo.avatarImgUrl} alt={comment.userId.userName}/></div>
                                    <h4>{comment.userId.userInfo.name !== ''?comment.userId.userInfo.name:comment.userId.userName} </h4>
                                    <p> {comment.content}</p>
                                </div>
                                
                            </div>
                        )})}
                    </div>
                    <form className='post-comment-add' onSubmit={this.postCommentHandler} ref={form => { this.form = form}}>
                        <input className='post-comment-add-input' type="text" placeholder='Add a comment' onChange={event=>this.setState({comment:event.target.value})}/>
                        <input className='btn post-comment-add-btn' type='submit' value="post" disabled={this.state.comment.trim() === ''}/>
                    </form>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state =>{
    return{
        token : state.auth.token,
        userId:state.auth.userId,
        userName:state.user.userInfo.userName,
        userInfo:state.user.userInfo,
        userPosts:state.post.posts,
        otherUserPosts:state.user.otherUser.posts
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onPostLikeDislike : (action,postId,userId,token) => dispatch(actions.postLikeDislike(action,postId,userId,token))
        ,onPostComment : (postId,postCreatorId,userId,commentData,token,feedPost) => dispatch(actions.postComment(postId,postCreatorId,userId,commentData,token,feedPost))
        ,onGetUser: (userName,token) => dispatch(actions.getUser(userName,token))
}}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Post))