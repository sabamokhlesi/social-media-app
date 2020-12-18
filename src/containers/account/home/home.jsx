import React from'react'
import './home.scss'
import Post from '../../../components/post/post'

class Home extends React.Component{
    render(){
        return (
            <div className='home'>
                <div className='posts'>
                    {this.props.posts.length>0?this.props.posts.map(post=><Post postInfo={post} deleteHandler={()=>{}} profileClicked={()=>{}} feedPost={true}/>):"No post to show!"}
                </div>
            </div>
        )
    }
}

export default Home