import React from 'react';
import './navBar.css';
import {NavLink} from 'react-router-dom'

const NavBar=()=>{
    return(
    <div className="nav_div">
    <div className="logo_div">
        <NavLink className="links"
        activeStyle={{ color: 'white' ,fontWeight:'bolder'}} to={'/'} exact>EVENTS
        </NavLink></div>
    
    <div>
        <ul className="nav_ul">
            <li>
                <NavLink className="links"
                    activeStyle={{ color: 'white',fontWeight:'bolder' }} 
                    to={"/login"} exact>Log In
                </NavLink>
            </li>
            <li>
                <NavLink className="links"
                    activeStyle={{ color: 'white',fontWeight:'bolder' }}
                    to={'/'} exact>All Events
                </NavLink> 
            </li>
            <li>
                <NavLink className="links"
                    activeStyle={{ color: 'white',fontWeight:'bolder' }}
                    to={'/myevents'} exact>My Events
                </NavLink> 
            </li>
            <li>
                <NavLink className="links"
                    activeStyle={{ color: '#292826',fontWeight:'bolder' }}
                    to={'/log'} exact>Log Out</NavLink>
            </li>
        </ul>
    </div>
    </div>
    )
};


export default NavBar;