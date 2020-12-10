import React from'react'
import './post.scss'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import photo from '../../images/avatar-preview.jpg'
// import photo2 from '../../images/example-photo.png'
import { FaHeart,FaRegComment,FaRegHeart } from "react-icons/fa"

class Post extends React.Component {

    state={liked:false,postId:''}

    render(){
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
                this.props.onPostLikeDislike(this.state.liked?'unlike':'like',this.props.postInfo.postId,this.props.userId,this.props.token)
                console.log(this.props.postInfo.postId)
                this.state.liked? this.setState({liked:false}):this.setState({liked:true})
            }
        }
        return (
            <div onClick={onDoubleClick} className='post' style={this.props.style}>
                <div className='post-top'>
                    <div className='post-top-img-box'><img src={this.props.postInfo.creatorAvatarUrl !== ''?'http://localhost:8080/'+this.props.postInfo.creatorAvatarUrl:photo} alt="Jane Smith"/></div>
                    <h4>{this.props.postInfo.creatorName !== ''?this.props.postInfo.creatorName:this.props.postInfo.creatorUserName}</h4>
                </div>
                <img className='post-photo' src={'http://localhost:8080/'+this.props.postInfo.imageUrl} alt="example"/>
                <div className='post-likebar'>
                    {!this.state.liked?<FaRegHeart onClick={onDoubleClick}/>:<FaHeart onClick={onDoubleClick}/>}
                    <FaRegComment/>
                </div>
                <div className='post-caption'>
                    <h4>{this.props.postInfo.creatorName !== ''?this.props.postInfo.creatorName:this.props.postInfo.creatorUserName}</h4>
                    <p>{this.props.postInfo.caption}</p>
                </div>
                <div className='post-comments'>
                    <h4>12 Comments</h4>
                    <div className='post-comments-main'>
                        <div className='post-comment'>
                            <div className='post-comment-title'>
                                <div className='post-comment-img-box'><img src={photo} alt="Jane Smith"/></div>
                                <h4>Jane Doe:</h4>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum saepe voluptate quaerat provident nemo nostrum animi eligendi, ipsam libero laborum ipsum ducimus? Consequuntur explicabo nesciunt veniam animi ab labore tempora.</p>
                        </div>
                        <div className='post-comment'>
                            <div className='post-comment-title'>
                                <div className='post-comment-img-box'><img src={photo} alt="Jane Smith"/></div>
                                <h4>Jane Doe:</h4>
                            </div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </div>
                    </div>
                    <div className='post-comment-add'>
                        <input type="text" placeholder='Add a comment'/>
                        <button className='btn'>post</button>
                    </div>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state =>{
    return{
        token : state.auth.token,
        postMessage: state.post.message,
        loading:state.post.loading,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onPostLikeDislike : (action,postId,userId,token) => dispatch(actions.postLikeDislike(action,postId,userId,token))
}}


export default connect(mapStateToProps,mapDispatchToProps)(Post)