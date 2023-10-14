import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpLoading } from '../../actions/notes';
import moment from 'moment'


export const NotesAppBar = () => {

  const noteDate= moment().format("dddd, MMMM Do YYYY")

  const dispatch = useDispatch();
  const {active} = useSelector( state => state.notes );

  const handleSave = () => {

    dispatch(startSaveNote(active))
  }

  const handleClickPicture=()=>{
      document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => {
      
      const file = e.target.files[0]
      
      if(file){
        dispatch(startUpLoading(file))
      }
  }

  return (
    <div className='notes__appbar'>

        <samp>{noteDate}</samp>

        <input type='file'
        id='fileSelector'
        style={{display:'none'}}
        name='file'
        onChange={handleFileChange}
        />

        <div>
            <button className='btn'
            onClick={handleClickPicture}>Picture</button>

            <button className='btn'
            onClick={handleSave}>Save</button>
        </div>

    </div>
  )
}
