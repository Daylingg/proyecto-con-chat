import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

export const NavbarChat = () => {

    const navigate= useNavigate()
    const {name,photo} = useSelector( state => state.auth );

    const handleLogoutChat=()=>{
        navigate('/')
    }

    
    const photoD='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNR2RDhl8_4AZTUV2j1VY0gcDkp9OYsSkcDFPRejxmKC4P-Etr0eu2Iaw8lm4yOCP0BiM&usqp=CAU'

    return (
        <div className='navbarChat'>
            <span className='logo'>Chat</span>
            <div className='user'>
                {photo?<img src={photo} alt=''/>:<img src={photoD} alt=''/>}
                <span>{name}</span>
                <button onClick={handleLogoutChat}>Salir</button>
            </div>
            
        </div>
    )
}
