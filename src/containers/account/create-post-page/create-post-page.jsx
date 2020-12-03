import React from'react'
import './create-post-page.scss'
import img from '../../../images/img-preview.jpg'

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
                        <img id="previewImg" src={img} alt='preview'/>
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

// import React from'react'
// import './create-post-page.scss'
// import img from '../../../images/img-preview.jpg'

// class CreatePost extends React.Component {
//     state={
//         file:null,
//         caption:''
//     }
//     previewImg = document.getElementById('previewImg');
//     imgPreview = function(event) {
//         const reader = new FileReader()
//         reader.onload = function(){this.previewImg.src = reader.result}
//         reader.readAsDataURL(event.target.files[0])
//         this.setState({file:event.target.files[0]});
//       };
//       handleSubmit = event =>{
//           event.preventDefault()
//           const data = new FormData(event.target)
//         //   props.postClicked(data,props.token)
//         //   this.props.postClicked({image:(Array.from(data)[0])[1],caption:(Array.from(data)[1])[1]},this.props.token)
//         this.props.postClicked({caption:this.state.caption,image:this.state.file},this.props.token)
//         //   console.log({image:(Array.from(data)[0])[1],caption:(Array.from(data)[1])[1]})
//         //   console.log(Array.from(data))
//       }
//       render(){
//         return (
//             <div className='create-post' style={this.props.style}>
//                 <form className='new-post' onSubmit={this.handleSubmit}>
//                     <div className='new-post-top'>
//                         <h2>Create Post</h2>
//                     </div>
//                     <div className='new-post-body'>
//                         <div className='new-post-upload-photo'>
//                             <div className='file-btn'>
//                                 <label htmlFor="uploadimg" className='btn btn-primary'>Upload a photo</label>
//                                 <input type="file" accept="image/*" onChange={event=>this.imgPreview(event)} id='uploadimg' name='image'/>
//                             </div>
//                             <img id="previewImg" src={img} alt='preview'/>
//                         </div>
//                         <div className='new-post-caption'>
//                             <input type='text' name='caption' onChange={(event)=>this.setState({caption:event.target.value})} placeholder='Write a caption...'/>
//                         </div>
//                     </div>
//                     <input type='submit' className='btn btn-four' value='post'/>
//                 </form>
//             </div>
//         )
//       }
    
// }

// export default CreatePost