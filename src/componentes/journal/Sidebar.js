import React from 'react'
import { useDispatch } from 'react-redux'
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'



export const Sidebar = () => {

    const dispatch = useDispatch();
    // const {name} = useSelector( state => state.auth );



const handleAddNew = () => {
    dispatch(startNewNote())
}

  return (
    <aside className='journal__sidebar'>

        

        <div className='journal__new-entry' onClick={handleAddNew}>
            <i className='far fa-calendar-plus fa-5x'></i>
            <p className='mt-3'>New Entry</p>
        </div>

        <JournalEntries />
    </aside>
  )
}
