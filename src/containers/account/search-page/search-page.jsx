import React from'react'
import './search-page.scss'
// import {FaSearch} from "react-icons/fa"
import photo from '../../../images/avatar-preview.jpg'
import { useHistory } from "react-router-dom"
import Spinner from '../../../components/spinner/spinner'
const SearchPage = (props) => {
    const serverUrl = 'https://socialmedia-backend.herokuapp.com/'
    // const serverUrl = 'http://localhost:8080/'

    const history = useHistory();
    const linkHandler = (userName)=>{
        props.gettingUser(userName,props.token)
        history.push('/'+userName)
         
        }
    var timeout = null;
    const doDelayedSearch=(key)=>{
        if (timeout) {  
        clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
            props.onSearch(key,props.token);
        }, 500);
    }
    return (
        <div className='search-page'>
            <div className='search-body'>
                <input type="search" name='search' placeholder='Search accounts' onChange={event=>doDelayedSearch(event.target.value)}/>
                <div className='search-results'>
                    <p className='search-title'>Result:</p>
                    {!props.loading?
                    props.results.map(user=>
                        <div className='search-result' onClick={()=>linkHandler(user.userInfo.userName)}>
                            <div className='search-result-img-box'><img src={user.userInfo.avatarImgUrl !== ''?serverUrl+user.userInfo.avatarImgUrl:photo} alt="Buddy user"/></div>
                            <h5>{user.userInfo.name !== ''? user.userInfo.name:user.userInfo.userName}</h5>
                            <p> (@{user.userInfo.userName})</p>
                        </div>
                    ):<Spinner/>}
                </div>
            </div>
        </div>
    )
}

export default SearchPage