import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  signOut, updateProfile } from "firebase/auth"
import Swal from "sweetalert2"
import { auth, db} from "../firebase/firebase-config"
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui"
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { dataURLtoFile, uploadFile } from "../helper/functions"
import { noteLogout } from "./notes"
import { async } from "@firebase/util"



export const login = (uid, displayName,photoURL) => ({
    
        type: types.login,
        payload:{
            uid,
            displayName,
            photoURL
        }
    }   
)


export const startLoginEmailPass = (email, password) => {
    return (dispatch)=>{

        dispatch(startLoading())

        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(
                login(user.uid, user.displayName, user.photoURL)
            )
            dispatch(finishLoading())
        })
        .catch((e)=>{
            dispatch(finishLoading())
            Swal.fire('Error',e.message, 'error')
        })
        
    }
}


export const startRegisterWithEmailPassName = (email, password, name,file) => {

    
    return (dispatch) =>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(async({user})=>{

            const resultUrl = await uploadFile(file)
            
            await updateProfile(user, {
                'displayName': name,
                'photoURL': resultUrl
            })
            //crear usauario en bd
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                photoURL: resultUrl,
            })
            //crear chat vacio en bd
            await setDoc(doc(db, "userChats", user.uid), {});
                    
            
            dispatch(
                login(user.uid, user.displayName,user.photoURL)
            )
        })
        .catch(e=>{
            Swal.fire('Error',e.message, 'error')
        })
    }
}


export const startLogout = () => {
    return async(dispatch) => {
        await signOut(auth)//se hace el logout de firebase

        dispatch(logout())
        dispatch(noteLogout())
    }
}

export const logout =()=>({
    type: types.logout
})

export const UpdatePhotoProfile=async(img)=>{
    
    const usuario= auth.currentUser    
    const dateId = new Date().getTime();
    const fileName = `${dateId}.jpg`;
    const file = dataURLtoFile(img, fileName);

    const resultUrl = await uploadFile(file)

    // Actualizar la foto de perfil en el usuario
    await updateProfile(usuario, {
        //displayName': name,
        'photoURL': resultUrl
    })

    // Actualizar la foto de perfil en Firestore
    const userRef = doc(db,'users',usuario.uid)
    await updateDoc(userRef,{
        photoURL: resultUrl
    });

    return usuario.photoURL
    
    
}

export const updatePhoto = (photoURL) => ({
    
    type: types.updatePhoto,
    payload:{
        photoURL
    }
}   
)