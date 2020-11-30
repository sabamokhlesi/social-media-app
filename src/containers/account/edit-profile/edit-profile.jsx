import React from'react'
import './edit-profile.scss'
import photo from '../../../images/photo.jpg'
import {FaPencilAlt} from "react-icons/fa"

const editProfile = (props) => {
    const imgPreview = function(event) {
        const reader = new FileReader();
        reader.onload = function(){
          const previewImgEdit = document.getElementById('previewImgEdit');
          previewImgEdit.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      };

    return (
        <div className='edit-profile' style={props.style}>
                <div className='edit-profile-top'>
                    <h2>Edit Profile</h2>
                </div>
                <div className='edit-profile-body'>
                    <div className='new-post-upload-photo'>
                        <div className='edit-btn'>
                            <label htmlFor="uploadimgEdit" className=''><FaPencilAlt/></label>
                            <input type="file" accept="image/*" onChange={event=> imgPreview(event)} id='uploadimgEdit'/>
                        </div>
                        <div className='edit-profile-img-box'>
                            <img id="previewImgEdit" src={photo} alt='preview'/>
                        </div>
                    </div>
                    <div>
                        Name: Saba
                    </div>
                    <button className='btn btn-four'>save</button>
                </div>
        </div>
    )
}

export default editProfile