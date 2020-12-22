import React from'react'
import './edit-profile.scss'
import photo from '../../../images/avatar-preview.jpg'
import {FaPencilAlt} from "react-icons/fa"

const editProfile = (props) => {
    const serverUrl = 'https://socialmedia-backend.herokuapp.com/'
    // const serverUrl = 'http://localhost:8080/'

    const previewImgEdit = document.getElementById('previewImgEdit');
    
    const imgPreview = function(event) {
        const reader = new FileReader();
        reader.onload = function(){
          previewImgEdit.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        // image = event.target.files[0]
      };

      const handleSave = event =>{
        event.preventDefault()
        const data = new FormData(event.target)
        props.saveSettingsClicked({avatarImgUrl:(Array.from(data)[0])[1],name:(Array.from(data)[1])[1],bio:(Array.from(data)[2])[1]},props.token,props.userId)
        props.changeState()
        }
    return (
        <div className='edit-profile' style={props.style}>
                <div className='edit-profile-top'>
                    <h2>Edit Profile</h2>
                </div>
                <form className='edit-profile-body' onSubmit={handleSave}>
                    <div className='edit-profile-upload-photo'>
                        <div className='edit-btn'>
                            <label htmlFor="uploadimgEdit" className=''><FaPencilAlt/></label>
                            <input type="file" name='image' accept="image/*" onChange={event=> imgPreview(event)} id='uploadimgEdit'/>
                        </div>
                        <div className='edit-profile-img-box'>
                            <img id="previewImgEdit" src={props.userInfo.avatarImgUrl === ''?photo:serverUrl+props.userInfo.avatarImgUrl}  alt='preview'/>
                        </div>
                    </div>
                    <div className='edit-profile-info-box'>
                        <div className='edit-profile-info'>
                            <label htmlFor="edit-profile-name">Your Name</label>
                            <input type="text" id="edit-profile-name" name="edit-profile-name" defaultValue={props.userInfo.name} />
                        </div>
                        <div className='edit-profile-info'>
                            <label htmlFor="edit-profile-bio">Your Bio</label>
                            <input type="text" id="edit-profile-bio" name="edit-profile-bio" defaultValue={props.userInfo.bio}/>
                        </div>
                    </div>
                    <input type='submit' className='btn btn-primary' value='save'/>
                </form>
        </div>
    )
}

export default editProfile
