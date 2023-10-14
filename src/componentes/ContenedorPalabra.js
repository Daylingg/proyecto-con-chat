import React from 'react'

export const ContenedorPalabra = ({wordShow,wordApi,exist}) => {
    

  return (
    <div className='  contWord'>
    {
      new Array(5).fill(0).map((_,i)=>{
            const bgColor= !exist
            ?''
            :wordApi[i]===wordShow[i]
            ?'correct'
            :wordApi.includes(wordShow[i])
            ?'present':'absent'

            return(
                <div key={i} className={`item ${bgColor}`}>{wordShow[i]}</div>
            )
            
        })
    }
    
      
    </div> 
  )
}

