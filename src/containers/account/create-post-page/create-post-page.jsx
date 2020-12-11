import React from'react'
import './create-post-page.scss'
// import img from '../../../images/img-preview.jpg'

class CreatePost extends React.Component  {
    state={disabled:true,src:''}
    
    imgPreview = event => {
        const previewImg = document.getElementById('previewImg');
        const reader = new FileReader();
        reader.onload = function(){
          previewImg.src = reader.result;
        //   this.setState({src:reader.result}).bind(this)
        };
        reader.readAsDataURL(event.target.files[0]);
        this.setState({disabled:false})
      };
    handleSubmit = event =>{
          event.preventDefault()
          const data = new FormData(event.target)
        this.props.postClicked({image:(Array.from(data)[0])[1],caption:(Array.from(data)[1])[1]},this.props.token)
        this.props.changeState()
      }
      render(){
        return (
            <div className='create-post' style={this.props.style}>
                <form className='new-post' onSubmit={this.handleSubmit}>
                    <div className='new-post-top'>
                        <h2>Create Post</h2>
                    </div>
                    <div className='new-post-body'>
                        <div className='new-post-upload-photo'>
                            <div className='file-btn'>
                                <label htmlFor="uploadimg" className='btn btn-primary'>Upload a photo</label>
                                <input type="file" accept="image/*" onChange={event=>this.imgPreview(event)} id='uploadimg' name='image'/>
                            </div>
                            <img id="previewImg" src alt=''/>
                        </div>
                        <div className='new-post-caption'>
                            <input type='text' name='caption' placeholder='Write a caption...'/>
                        </div>
                    </div>
                    <input type='submit' className='btn btn-four new-post-btn' value='post' disabled={this.state.disabled}/>
                </form>
            </div>
        )
      }
    
}

export default CreatePost
