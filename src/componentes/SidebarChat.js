import React from 'react'
import { Chats } from './Chats'
import { NavbarChat } from './NavbarChat'
import { SearchChat } from './SearchChat'

export const SidebarChat = () => {
  return (
    <div className='sidebar'>
        <NavbarChat/>
        <SearchChat/>
        <Chats/>
    </div>
  )
}
