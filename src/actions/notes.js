import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { loadNotes, uploadFile } from "../helper/functions"
import { types } from "../types/types"


export const startNewNote=()=>{
    return async(dispatch,getState)=>{

        const {uid}=getState().auth
        
        const newNote={
            title:'',
            body:'',
            date:new Date().getTime()
        }

        const note=await addDoc(collection(db,`users/${uid}/notes`),newNote)

        dispatch(activeNote(note.id,newNote))

        dispatch(addNewNote(note.id, newNote))
    }
}

export const activeNote=(id, note)=>({
    type:types.notesActive,
    payload:{
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({

    type:types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const startLoadingNotes=(uid)=>{
    return async(dispatch)=>{
        const notes=await loadNotes(uid)
        
        dispatch(setNote(notes))
    }
}

export const setNote=(notes)=>({
    type:types.notesLoad,
    payload:notes
})

export const startSaveNote=(note)=>{
    return async(dispatch,getState)=>{

        const {uid}=getState().auth

        const noteToFirestore={...note}
        delete noteToFirestore.id

        const docRef = doc(db, `users/${uid}/notes`, note.id);
        await updateDoc(docRef, noteToFirestore)

        dispatch(refreshNote(note.id,noteToFirestore))

        Swal.fire('Saved','Save note ','success')
    }
}


export const refreshNote=(id, note)=>({
    type:types.notesUpdate,
    payload:{
        id, 
        note:{
            id,
            ...note
        }
    }
})


export const startUpLoading = (file) => {
    return async (dispatch, getState)=>{

        const {active: activeNote} = getState().notes 

        Swal.fire({
            title:'Uploading...',
            text:'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })

        const fileUrl = await uploadFile(file)
        activeNote.url = fileUrl


        dispatch(startSaveNote(activeNote))

        Swal.close() 
    }
}

export const startDeleting=(id)=>{
    return async(dispatch,getState)=>{

        const uid = getState().auth.uid 
        
        const docRef = doc(db, `users/${uid}/notes`, id) 

        await deleteDoc(docRef) 

        dispatch(deleteNote(id))
    }
} 


export const deleteNote = (id) => ({

    type:types.notesDelete,
    payload:id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleanig
})