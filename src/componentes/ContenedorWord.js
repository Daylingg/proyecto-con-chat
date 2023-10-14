import React from 'react'

export const ContenedorWord = ({wordShow,wordApi,exist}) => {
    
  return (
    <div className='  contWord'>
    {
        new Array(4).fill(0).map((_,i)=>{
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