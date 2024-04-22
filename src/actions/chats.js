import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import Swal from 'sweetalert2'
import { db } from '../firebase/firebase-config'
import { uploadFile } from '../helper/functions'
import { types } from '../types/types'

export const chatsNewUser = (idChat, infoUser) => ({
  type: types.chatNew,
  payload: {
    uid: idChat,
    user: {
      infoUser,
    },
  },
})

export const chatMessage = (img, text) => {
  const idMsgChatImg = new Date().getTime()

  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { chatId, user } = getState().chat

    const msj = {
      id: idMsgChatImg,
      text,
      senderId: uid,
    }
    try {
      if (img) {
        const resultUrl = await uploadFile(img)

        await updateDoc(doc(db, 'chats', chatId), {
          messages: arrayUnion({
            id: idMsgChatImg,
            text,
            senderId: uid,
            date: Timestamp.now(),
            img: resultUrl,
          }),
        })
      } else {
        await updateDoc(doc(db, 'chats', chatId), {
          messages: arrayUnion({
            id: idMsgChatImg,
            text,
            senderId: uid,
            date: Timestamp.now(),
          }),
        })
      }

      await updateDoc(doc(db, 'userChats', uid), {
        [chatId + '.lastMessage']: {
          text,
        },
        [chatId + '.date']: serverTimestamp(),
      })

      await updateDoc(doc(db, 'userChats', user.uid), {
        [chatId + '.lastMessage']: {
          text,
        },
        [chatId + '.date']: serverTimestamp(),
      })
    } catch (error) {
      Swal.fire('Error', error, 'error')
    }

    dispatch(chatMsgUpdate(chatId, msj))
  }
}

const chatMsgUpdate = (chatId, msj) => ({
  type: types.msgUpdate,
  payload: {
    uid: chatId,
    messages: msj,
  },
})
