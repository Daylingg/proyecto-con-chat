import React from 'react'
import { ChatArea } from './ChatArea'
import { Header } from './Header'
import { SidebarChat } from './SidebarChat'


export const ChatScreen = () => {

  
  return (
    <>
      <Header/>
      <div className='home'>
        <div className='containerChat'>
          <SidebarChat/>
          <ChatArea/>
        </div>
      </div>
    </>
    
  )
}
