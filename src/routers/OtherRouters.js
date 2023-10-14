import React from 'react'
import { Route, Routes } from 'react-router-dom'
import  Ahorcado  from '../componentes/Ahorcado'
import { ChatScreen } from '../componentes/ChatScreen'
import { GameAreaScreen } from '../componentes/GameAreaScreen'
import JournalScreen from '../componentes/JournalScreen'
import { JuegoPalabra } from '../componentes/JuegoPalabra'


export const OtherRouters = ({chats}) => {
    return (
        
                <Routes>
                    <Route path='/' element={<JournalScreen/>} />
                    <Route path='/chat' element={<ChatScreen />} />
                    <Route path='/game' element={<GameAreaScreen/>} />
                    <Route path='/ahorcado' element={<Ahorcado/>} />
                    <Route path='/wordless' element={<JuegoPalabra/>} />
                </Routes>
            )
}