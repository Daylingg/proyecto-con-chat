import React from 'react'
import Cam from '../assets/video.png'
import Add from '../assets/user.png'
import More from '../assets/more.PNG'
import { useSelector } from 'react-redux'
import { MessagesArea } from './MessagesArea'
import { Input } from './Input'

export const ChatArea = () => {

  const {user} = useSelector( state => state.chat );


  
  return (
    <div className='chatArea'>
      <div className='chatArea-info'>
        <span>{user.name}</span>
        <div className='chatIcons'>
          <img src={Cam} alt='' />
          <img src={Add} alt='' />
          <img src={More} alt='' />
        </div>
      </div>

      <MessagesArea/>
      <Input/>
    </div>
  )
}
