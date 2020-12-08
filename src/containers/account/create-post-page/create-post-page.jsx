import React from'react'
import './create-post-page.scss'
// import img from '../../../images/img-preview.jpg'

const  createPost = (props) => {
    const previewImg = document.getElementById('previewImg');
    let image
    const imgPreview = function(event) {
        const reader = new FileReader();
        reader.onload = function(){
          previewImg.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        image = event.target.files[0]
      };
      const handleSubmit = event =>{
          event.preventDefault()
          const data = new FormData(event.target)
        props.postClicked({image:image,caption:(Array.from(data)[1])[1]},props.token)
        props.changeState()
      }
    return (
        <div className='create-post' style={props.style}>
            <form className='new-post' onSubmit={handleSubmit}>
                <div className='new-post-top'>
                    <h2>Create Post</h2>
                </div>
                <div className='new-post-body'>
                    <div className='new-post-upload-photo'>
                        <div className='file-btn'>
                            <label htmlFor="uploadimg" className='btn btn-primary'>Upload a photo</label>
                            <input type="file" accept="image/*" onChange={event=>imgPreview(event)} id='uploadimg' name='image'/>
                        </div>
                        <img id="previewImg" src alt=''/>
                    </div>
                    <div className='new-post-caption'>
                        <input type='text' name='caption' placeholder='Write a caption...'/>
                    </div>
                </div>
                <input type='submit' className='btn btn-four' value='post'/>
            </form>
        </div>
    )
}

export default createPost
