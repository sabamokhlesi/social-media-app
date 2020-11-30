import React from'react'
import './navbar.scss'
import logo from '../../../images/logofull.png'
import {NavLink} from 'react-router-dom'
import { FaHome,FaSearch,FaPlus,FaRegUserCircle} from "react-icons/fa";

const navbar = (props) => {
    return (
        <div className='navbar'>
            <img src={logo} alt="Buddy logo"/>
            <div className='navbar-right'>
                <div className='navbar-list'>
                    <div className='navbar-item'>
                        <NavLink activeClassName='navbar-item-active' to='/' exact className='btn' onClick={props.onNavItemClicked}><FaHome size='2.4rem'/></NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink activeClassName='navbar-item-active' exact to='/search' className='btn' onClick={props.onNavItemClicked}><FaSearch size='2.4rem'/></NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink activeClassName='navbar-item-active' exact to='/profile' className='btn' onClick={props.onNavItemClicked}><FaRegUserCircle size='2.4rem'/></NavLink>
                    </div>
                    <div className='navbar-item'>
                        {/* <NavLink activeClassName='navbar-item-active' exact to='/create-post' className='btn' onClick={props.onNavItemClicked}><FaPlus size='2.4rem'/></NavLink> */}
                        <button exact onClick={props.addPostClick} className='btn'><FaPlus size='2.4rem'/></button>
                    </div>
                </div>
                <button className='btn btn-primary' onClick={props.onLogOutClick}>Log Out</button>
            </div>
        </div>
    )
}

export default navbar