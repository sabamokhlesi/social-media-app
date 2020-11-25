import React from'react'
import './search-page.scss'
import {FaSearch} from "react-icons/fa"
import photo from '../../../images/photo.jpg'
const searchPage = (props) => {
    return (
        <div className='search-page'>
            <div className='search-body'>
                <input type="search" name='search' placeholder='Search accounts'/>

                <div className='search-results'>
                    <p className='search-title'>Your followings:</p>
                    <div className='search-result'>
                        <div className='search-result-img-box'><img src={photo} alt="Jane Smith"/></div>
                        <h5>Jane Smith</h5>.
                        <p>Following</p>
                    </div>
                    <div className='search-result'>
                        <div className='search-result-img-box'><img src={photo} alt="Jane Smith"/></div>
                        <h5>Jane Smith</h5>.
                        <p>Following</p>
                    </div>
                    <div className='search-result'>
                        <div className='search-result-img-box'><img src={photo} alt="Jane Smith"/></div>
                        <h5>Jane Smith</h5>.
                        <p>Following</p>
                    </div>
                </div>
                <div className='search-results'>
                    <p className='search-title'>Other accounts:</p>
                </div>
                <button className='btn search-btn'><FaSearch size='1.6rem'/> &nbsp; Show all ...</button>
            </div>
        </div>
    )
}

export default searchPage