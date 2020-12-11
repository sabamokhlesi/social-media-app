import React from'react'
import './post.scss'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import photo from '../../images/avatar-preview.jpg'
// import photo2 from '../../images/example-photo.png'
import { FaHeart,FaRegComment,FaRegHeart,FaEllipsisV } from "react-icons/fa"
import { Redirect } from 'react-router-dom'

class Post extends React.Component {

    state={
        liked:false,
        postId:'',
        deleteOpen:false
    }

    

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
                this.state.liked? this.setState({liked:false}):this.setState({liked:true})
            }
        }
        return (
            <div onClick={onDoubleClick} className='post' style={this.props.style}>
                {this.props.postInfo.postId?<Redirect to={`/${this.props.userName}`}/>:null}
                <div className='post-top'>
                    <div className='post-top-left'>
                        <div className='post-top-img-box'><img src={this.props.postInfo.creatorAvatarUrl !== ''?'http://localhost:8080/'+this.props.postInfo.creatorAvatarUrl:photo} alt="Jane Smith"/></div>
                        <h4>{this.props.postInfo.creatorName !== ''?this.props.postInfo.creatorName:this.props.postInfo.creatorUserName}</h4>
                    </div>
                    <div className='post-top-delete-box' style={this.props.postInfo.userId === this.props.userId? {display:'block'}:{display:'none'}}>
                        <FaEllipsisV onClick={()=>this.setState(this.state.deleteOpen?{deleteOpen:false}:{deleteOpen:true})}/>
                        <div style={this.state.deleteOpen?{display:'block'}:{display:'none'}} onClick={this.props.deleteHandler} className='post-top-delete'>delete post</div>
                    </div>
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
        userId:state.auth.userId,
        userName:state.user.userInfo.userName
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onPostLikeDislike : (action,postId,userId,token) => dispatch(actions.postLikeDislike(action,postId,userId,token))
}}


export default connect(mapStateToProps,mapDispatchToProps)(Post)