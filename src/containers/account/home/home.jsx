import React from'react'
import './home.scss'
import Post from '../../../components/post/post'
import photo from '../../../images/avatar-preview.jpg'

class Home extends React.Component{
    render(){
        return (
            <div className='home'>
                <div className='posts'>
                    {this.props.posts.length>0?this.props.posts.map(post=><Post postInfo={post} deleteHandler={()=>{}} profileClicked={()=>{}} feedPost={true}/>):"No post to show!"}
                </div>
                <div className='home-right'> 
                    <div className='home-right-top'>
                        <div className='search-result'>
                            <div className='search-result-img-box'><img src={this.props.userInfo.avatarImgUrl !== ''?'http://localhost:8080/'+this.props.userInfo.avatarImgUrl:photo} alt="Buddy user"/></div>
                            <h5>{this.props.userInfo.name !== ''? this.props.userInfo.name:this.props.userInfo.userName}</h5>
                            <p> (@{this.props.userInfo.userName})</p>
                        </div>
                    </div>
                    <div className='home-right-top'>
                        <p>Suggestions for you</p>
                        <div className='search-result'>
                            <div className='search-result-img-box'><img src={photo} alt="Buddy user"/></div>
                            <h5>{this.props.userInfo.name !== ''? this.props.userInfo.name:this.props.userInfo.userName}</h5>
                            <p> (@{this.props.userInfo.userName})</p>
                        </div>
                        <div className='search-result'>
                            <div className='search-result-img-box'><img src={photo} alt="Buddy user"/></div>
                            <h5>{this.props.userInfo.name !== ''? this.props.userInfo.name:this.props.userInfo.userName}</h5>
                            <p> (@{this.props.userInfo.userName})</p>
                        </div>
                        <div className='search-result'>
                            <div className='search-result-img-box'><img src={photo} alt="Buddy user"/></div>
                            <h5>{this.props.userInfo.name !== ''? this.props.userInfo.name:this.props.userInfo.userName}</h5>
                            <p> (@{this.props.userInfo.userName})</p>
                        </div>
                        <div className='search-result'>
                            <div className='search-result-img-box'><img src={photo} alt="Buddy user"/></div>
                            <h5>{this.props.userInfo.name !== ''? this.props.userInfo.name:this.props.userInfo.userName}</h5>
                            <p> (@{this.props.userInfo.userName})</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home