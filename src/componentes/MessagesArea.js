import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase-config'
import { Messages } from './Messages'
import { useSelector } from 'react-redux'

export const MessagesArea = () => {
  const [messages, setMessages] = useState([])
  const { chatId } = useSelector((state) => state.chat)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      //se busca el chat con el id q se pasa y se pegunta si existe
      doc.exists() && setMessages(doc.data().messages) //si existe se copian los msj en la variable de estado
    })

    return () => {
      unSub()
    }
  }, [chatId])

  return (
    <div className="messagesArea">
      {messages.map((msg) => (
        <Messages message={msg} key={msg.id} />
      ))}
    </div>
  )
}
