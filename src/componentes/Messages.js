import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

export const Messages = ({ message }) => {
  const { uid, photo } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.chat)
  const ref = useRef()

  const horaObt = moment.unix(message.date) // Crear objeto Moment a partir del timestamp
  const hora = horaObt.format('hh:mm a') // Aplicar la función format() al objeto Moment

  useEffect(() => {
    ref.uid?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <div
      ref={ref}
      className={`messages ${message.senderId === uid && 'owner'}`}
    >
      <div className="msgInfo">
        <img src={message.senderId === uid ? photo : user.photoURL} />
        <span>{hora}</span>
      </div>
      <div className="msgContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}
