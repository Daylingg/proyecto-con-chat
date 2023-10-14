import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from './Header'

export const GameAreaScreen = () => {
    
    const navigate = useNavigate()


  const handleClick=()=>{

    navigate('/ahorcado')
  
  }

  const handleClickGame=()=>{

    navigate('/wordless')

  }
  return (
    <>
      <Header/>
      <div className='container-game'>
        <div>
          <button className='btn-inicio' onClick={handleClick}>Ahorcado</button>
          <button className='btn-inicio' onClick={handleClickGame}>Juego de palabras</button>
        </div>
      </div>
    </>
    
  )
}
