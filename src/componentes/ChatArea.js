import React from 'react'
import Add from '../assets/user.png'
import { useSelector } from 'react-redux'
import { MessagesArea } from './MessagesArea'
import { Input } from './Input'

export const ChatArea = () => {

  const {user} = useSelector( state => state.chat );

  const handleClick=(e)=>{
    e.preventDefault()
    const file=e.target.files[0]
    console.log(file)
  }
  
  return (
    <div className='chatArea'>
      <div className='chatArea-info'>
        <span>{user.name}</span>
        <div className='chatIcons'>
          {/* <img src={Cam} alt='' /> */}
          <input className='auth__input file' type='file' id='fileSelector' style={{display:'none'}} />
            <label className='label-reg' htmlFor='fileSelector'onSelect={handleClick}>
                <img src={Add} alt=''/>
            </label>
          {/*<img src={Add} alt='' />
           <img src={More} alt='' /> */}
        </div>
      </div>

      <MessagesArea/>
      {user.name && <Input/>}
    </div>
  )
}
