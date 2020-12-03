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
                    <div className='edit-profile-info-box'>
                        <div className='edit-profile-info'>
                            <label htmlFor="edit-profile-name">Your Name</label>
                            <input type="text" id="edit-profile-name" name="edit-profile-name" defaultValue='Saba Mokhlesi' placeholder='i.e John'/>
                        </div>
                        <div className='edit-profile-info'>
                            <label htmlFor="edit-profile-bio">Your Bio</label>
                            <input type="text" id="edit-profile-bio" name="edit-profile-bio" defaultValue='Lorem, ipsum dolor sit amet adipisicing elit.' placeholder='Interested in ...'/>
                        </div>
                    </div>
                    <button className='btn btn-primary'>save</button>
                </div>
        </div>
    )
}

export default editProfile