import React, { useState } from 'react'
import File from '../assets/adjuntar.png'
import Img from '../assets/img.png'
import { useDispatch } from 'react-redux'
import { chatMessage } from '../actions/chats'

export const Input = () => {

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  // const {uid} = useSelector( state => state.auth );
  // const {chatId,user} = useSelector( state => state.chat );


  const handleSend=async(e)=>{
    e.preventDefault()
    
    dispatch(chatMessage(img,text))

    setText('')
    setImg(null)

  }

  return (
    <div className='inputChat' onSubmit={handleSend}>
    <form className='inputChat' onSubmit={handleSend}>
      <input type='text' 
        placeholder='Send msg' 
        onChange={(e) => setText(e.target.value)}
        value={text}/>

      <div className='send'>
          <img src={File} alt='' />        
          <input  type='file' 
          id='fileSelector' 
          style={{display:'none'}} 
          onChange={(e) => setImg(e.target.files[0])}  
          />
          <label htmlFor='fileSelector'>
              <img src={Img}/>
          </label>
          <button className='btn-send' onClick={handleSend}>Send</button>
      </div>
    </form>
        
    </div>
  )
}
