import React from'react'
import './post.scss'
import photo from '../../images/photo.jpg'
import photo2 from '../../images/example-photo.png'
import { FaHeart,FaRegComment,FaRegHeart } from "react-icons/fa"
const post = (props) => {
    return (
        <div className='post'>
            <div className='post-top'>
                <div className='post-top-img-box'><img src={photo} alt="Jane Smith"/></div>
                <h4>Jane Smith</h4>
            </div>
            <img className='post-photo' src={photo2} alt="example" onDoubleClick/>
            <div className='post-likebar'>
                <FaHeart/>
                <FaRegHeart/>
                <FaRegComment/>
            </div>
            <div className='post-caption'>
                <h4>Jane Smith</h4>
                <p>Lorem ipsum dolor sit amet adipisicing elit.</p>
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

export default post