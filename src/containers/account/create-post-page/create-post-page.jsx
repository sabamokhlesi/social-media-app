import React from'react'
import './create-post-page.scss'
import img from '../../../images/img-preview.jpg'

const createPost = (props) => {

    const imgPreview = function(event) {
        const reader = new FileReader();
        reader.onload = function(){
          const previewImg = document.getElementById('previewImg');
          previewImg.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      };
      
    return (
        <div className='create-post' style={props.style}>
            <div className='new-post'>
                <div className='new-post-top'>
                    <h2>Create Post</h2>
                </div>
                <div className='new-post-body'>
                    <div className='new-post-upload-photo'>
                        <div className='file-btn'>
                            <label htmlFor="uploadimg" className='btn btn-primary'>Upload a photo</label>
                            <input type="file" accept="image/*" onChange={event=>imgPreview(event)} id='uploadimg'/>
                        </div>
                        <img id="previewImg" src={img} alt='preview'/>
                    </div>
                    <div className='new-post-caption'>
                        <input type="text" name="caption" placeholder='Write a caption...'/>
                    </div>
                </div>
                <button className='btn btn-four'>post</button>
            </div>
        </div>
    )
}

export default createPost