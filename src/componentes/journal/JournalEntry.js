import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes'

export const JournalEntry = ({ id, title, body, url, date }) => {
  const dispatch = useDispatch()

  const noteDate = moment(date)

  const handleEntryClick = () => {
    dispatch(
      activeNote(id, {
        title,
        body,
        url,
        date,
      })
    )
  }

  // const urlD =
  //   'https://st2.depositphotos.com/1000391/11963/v/950/depositphotos_119635974-stock-illustration-magic-butterfly-with-floral-ornament.jpg'

  return (
    <div className="journal__entry pointer" onClick={handleEntryClick}>
      {url && ( //si existe algo en el url q se muestre la imagen
        <div
          className="journal__entry-picture "
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body} </p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format('ddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  )
}
