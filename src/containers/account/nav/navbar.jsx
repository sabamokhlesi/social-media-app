import React from'react'
import './navbar.scss'
import logo from '../../../images/logo-pink.png'
import {NavLink} from 'react-router-dom'
import { FaHome,FaSearch,FaPlus,FaRegUserCircle} from "react-icons/fa"
import { useHistory } from "react-router-dom"

const Navbar = (props) => {
    const history = useHistory()
        
    return (
        <div className='navbar'>
            <img src={logo} alt="Buddy logo" onClick={()=>history.push('/')}/>
            <div className='navbar-right'>
                <div className='navbar-list'>
                    <div className='navbar-item'>
                        <NavLink activeClassName='navbar-item-active' to='/' exact className='btn' onClick={props.onNavItemClicked}><FaHome size='2.4rem'/></NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink activeClassName='navbar-item-active' exact to='/search' className='btn' onClick={props.onNavItemClicked}><FaSearch size='2.4rem'/></NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink activeClassName='navbar-item-active' exact to={'/'+props.userName} className='btn' onClick={props.onNavItemClicked}><FaRegUserCircle size='2.4rem'/></NavLink>
                    </div>
                    <div className='navbar-item'>
                        <button exact onClick={props.addPostClick} className='btn'><FaPlus size='2.4rem'/></button>
                    </div>
                </div>
                <button className='btn btn-primary navbar-btn' onClick={props.onLogOutClick}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar