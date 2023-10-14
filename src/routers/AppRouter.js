import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { AuthRouter } from "./AuthRouter"
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { login } from "../actions/auth";
import { LoadingScreen } from "../componentes/LoadingScreen";
import { OtherRouters } from "./OtherRouters";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";




export const AppRouter = () => {
    
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true) //se crea un estado locaal con una bandera...si esta en true no se muestra nada mas de la aplicacion
    const [isloggedIn, setIsloggedIn] = useState(false)

    useEffect(() => {

        onAuthStateChanged(auth, async (user)=>{//mantiene la informacion del usuario q esta logueado para q cuando se recargue la pag no se pierda esa info
        
            if(user?.uid){//si el user tiene algo pregunta si existe el uid
                
                dispatch(login(user.uid, user.displayName, user.photoURL))
                setIsloggedIn(true)
        
                dispatch(startLoadingNotes(user.uid)) 
                
            }else{
                setIsloggedIn(false)//no se loguio el usuario
            }
                setChecking(false)//cuando se pone en false es pq ya tengo una respuesta del onAuthStateChanged
            })
        
        }, [dispatch,checking])

        if(checking){//si esta en true retorno un nuevo obj
            return (
                <LoadingScreen/>
            )
            
        }

    return(

        <Router>

            <Routes>

                <Route path="/auth/*" element={
                    <PublicRoute isAuthenticated={isloggedIn}>
                        <AuthRouter/>
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoute isAuthenticated={isloggedIn}>
                        <OtherRouters />
                    </PrivateRoute>
                } />

            </Routes>

        </Router>
    )

    

}
