import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase-config'
import { useSelector,useDispatch } from 'react-redux';
import { chatsNewUser } from '../actions/chats';
import Swal from 'sweetalert2';


export const Chats = () => {

    const [chats, setChats] = useState([])
    const {uid} = useSelector( state => state.auth );
    const dispatch = useDispatch();


    useEffect(() => {
        try {
                const getChats=async()=>{
                    const unsub =await onSnapshot(doc(db, "userChats", uid), (doc) => {
                        setChats(doc.data());
                        
                    })

                    return ()=>{
                    unsub()
                    }
                }  
                
                uid && getChats();

                

        } catch (error) {
            Swal.fire('Error','Hubo un error al cargar los msj','error')
        }
        


    }, [uid])

    const handleSelect=(userChat)=>{
        
        const idChat=userChat[0]
        const userInfo=userChat[1].userInfo
        
        dispatch(chatsNewUser(idChat,userInfo))
    }

    return (
        <div className='chats'>
        {
            (chats) && Object.entries(chats).sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
                <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat)}>
                    <img src={chat[1].userInfo.photoURL} alt=''/>
                    <div className='userChatInfo'>
                        <span>{chat[1].userInfo.name}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>)
            )
        }
            
        </div>
    )
}

