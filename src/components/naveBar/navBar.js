import React from 'react';
import './navBar.css';
import {NavLink} from 'react-router-dom'

const NavBar=(props)=>{
    
    const logout=()=>{
        localStorage.removeItem('expiredIn');
        return props.signout("")
    }
    
    return(
    <div className="nav_div">
        <div className="logo_div">
            <NavLink className="links"to={'/'} exact>EVENTS
            </NavLink></div>
        
        <div className="list_div">
            <ul className="nav_ul">
                <li>
                    <NavLink className="links"
                        activeClassName="links_active"
                        to={'/'} exact>All Events
                    </NavLink> 
                </li>

                <li>
                    <NavLink className="links"
                        activeClassName="links_active"  
                        to={'/myevents'} exact>My Events
                    </NavLink> 
                </li>
                
                {!props.auth?<li>
                    <NavLink className="links"
                        activeClassName="links_active" 
                        to={"/login"} exact>Log In
                    </NavLink>
                </li>:<li >
                    <NavLink className="links"
                        onClick={()=>logout("")}
                        to={'/'} exact>Log Out</NavLink>
                </li>}
            </ul>
        </div>
    </div>
    )
};


export default NavBar;