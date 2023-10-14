import React, { useState } from 'react'
import { collection,  getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { selectChat } from '../helper/functions';


export const SearchChat = () => {

  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const dispatch = useDispatch();

  const {uid,name,photo} = useSelector( state => state.auth );


  const handleSearch = async () => {
    
    const userSearch = collection(db, "users")
    const q = query(userSearch, where("name", "==", userName));

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if(doc.exists()){
            setUser(doc.data());
            
          }
        
      });
    } catch (err) {
      setErr(true);
      Swal.fire('Error',err,'error')
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
    

  const handleSelect=async()=>{

    const combineId = uid>user.uid ? uid + user.uid : user.uid + uid

    selectChat(combineId,uid,name,photo,user)
    
    setUser(null);
    setUserName("")
  }
    

  return (
    <div className='search'>
        <div className='searchForm'>
            <input className='inputSearch' 
            type='text' 
            placeholder='find' 
            onKeyDown={handleKey}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}/>
        </div>
        {err && <span>User not found!</span>}
      {user && (
        <div className='userChat' onClick={handleSelect}>
            <img src={user.photoURL} alt=''/>
            <div className='userChatInfo'>
                <span>{user.name}</span>
            </div>
        </div>
      )}
    </div>
  )
}

