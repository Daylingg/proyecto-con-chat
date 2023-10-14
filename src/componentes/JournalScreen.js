import React from 'react'
import { useSelector } from 'react-redux'
import { Header } from './Header'
import { NoteScreen } from './journal/NoteScreen'
import { NothingSelected } from './journal/NothingSelected'
import { Sidebar } from './journal/Sidebar'

export const JournalScreen = () => {

const {active} = useSelector( state => state.notes );

  return (
    <>
      <Header/>
      <div className='journal__main-content'>
        <Sidebar />

        <main>

        {
          (active)
          ?(<NoteScreen/>)
          :(<NothingSelected/>)
        }

        </main>
      </div>
    </>
    
  )
}

export default JournalScreen