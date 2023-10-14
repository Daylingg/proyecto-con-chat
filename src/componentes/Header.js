import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = () => {

    const dispatch = useDispatch();
    const {name} = useSelector( state => state.auth );

    const handleLogout=()=>{
        dispatch(startLogout())
    }

    return (
        <div className='header-bar'>
            <div className='menu-area'>
        
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Menú
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><NavLink className="dropdown-item" to='/'>Journal</NavLink></li>
                    <li><NavLink className="dropdown-item" to='/chat'>Chat</NavLink></li>
                    <li><NavLink className="dropdown-item" to='/game'>Games</NavLink></li>
                </ul>
            </div>

            </div>
            <div className='logout-modo-name'>
               
                <span> Hi {name} </span>
                
                
                <button className='btn' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            
        </div>
    )
}
