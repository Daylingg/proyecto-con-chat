import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../componentes/LoginScreen'
import { RegisterScreen } from '../componentes/RegisterScreen'

export const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <div >
                <Routes>
                    <Route path='/login' element={<LoginScreen/>} />
                    <Route path='/*' element={<LoginScreen/>} />
                </Routes>
            </div>
            
        </div>
    )
}