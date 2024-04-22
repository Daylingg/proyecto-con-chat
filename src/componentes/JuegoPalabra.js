import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useForm } from '../hooks/useForm'
import { ContenedorPalabra } from './ContenedorPalabra'
import { obtPalabra,removeAccents,validateWord } from '../helper/functions'
import { ContenedorWord } from './ContenedorWord'
import { LoadingScreen } from './LoadingScreen'
import { Header } from './Header'


export const JuegoPalabra = () => {

    const [valueInput,handleInputChange, reset]=useForm({word:''})

    const {word}=valueInput

    const [wordShow, setWordShow] = useState()
    const [turn, setTurn] = useState(0)
    const [wordComplete, setWordComplete] = useState([])
    const [error, setError] = useState('')
    let wordApi=wordShow


    useEffect(() => {
    
        obtPalabra()
        .then(resp=>{
            let wordLowerCase=resp.toLowerCase()
            let remAcenWord=removeAccents(wordLowerCase)
            
            setWordShow(remAcenWord.toLowerCase())
            
        })
        .catch(err=>{ 
            
            setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion")
        })

    
    }, [])
    
    const CleanWord=()=>{
        
        setWordComplete([])
        setWordShow('')
        setTurn(0)
        setError('')

        obtPalabra()
        .then(resp=>{
            let wordLowerCase=resp.toLowerCase()
            let remAcenWord=removeAccents(wordLowerCase)
        
            setWordShow(remAcenWord.toLowerCase())
            
        })
        .catch(err=>{ 
            
            setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion")
        })
    }

    const handleClick=(e)=>{
        e.preventDefault()
        
        let msj=validateWord(word,wordApi)

        if(msj){
           
            return Swal.fire({icon:'error',text:msj})
            .then(res => {
                if(res.isConfirmed){
                    reset()
                } })
        }else {
            
            
            if(turn===6){
                return Swal.fire({icon:'error',text:`Ya no quedan mas oportunidades`})

            }else
            if((wordApi.length===5 && turn===5 && wordApi!==word) || (wordApi.length===4 && turn===4 && wordApi!==word)){
                setWordComplete([...wordComplete,word])
                reset()
                setTurn(turn+1)
                return Swal.fire({icon:'error',text:`Has perdido el juego la palabra era ${wordApi.toUpperCase()}`})
                .then(res => {
                    if(res.isConfirmed){
                        CleanWord()
                    } })
            }else if(wordApi===word){
                setWordComplete([...wordComplete,word])
                reset()
                setTurn(turn+1)
                
                return Swal.fire({icon:'success',text:`Has ganado el juego la palabra era ${wordApi.toUpperCase()}`})
                .then(res => {
                    if(res.isConfirmed){
                        CleanWord()
                    } })
            }else {
                setTurn(turn+1)
                setWordComplete([...wordComplete,word])
                reset()
                
            }
        }
        
    }

    return (
        <>
        <Header/>
            {
                error 
                ? <div className='error'><h2>{error}</h2></div> 
                :(
                    !wordShow ? <LoadingScreen/>
                :<div className='container'>
                    <h1>Adivina la Palabra</h1>
                    <div className='form'>
                        <form>
                        <input className='inpWord'
                            type='text'
                            name='word'
                            placeholder='escribir palabra'
                            autoComplete='off'
                            value={word}
                            onChange={handleInputChange}
                            ></input>
                            <button onClick={handleClick}>Enviar</button>
                        </form>
                            
                        </div>

                        <div className='containerWord'>
                            {
                            ( wordShow.length===5) ? <div>
                            { 
                                wordComplete.map((el,i)=><ContenedorPalabra
                                key={i}
                                    wordShow={el}
                                    wordApi={wordApi}
                                    exist={true}/>)
                                    
                            }

                            {
                                new Array(6-turn).fill(0).map((_,i)=><ContenedorPalabra key={i}
                                    wordShow={''}/>)
                            }
                            </div> 
                                :<div>
                            { 
                                wordComplete.map((el,i)=><ContenedorWord 
                                key={i}
                                    wordShow={el}
                                    wordApi={wordApi}
                                    exist={true}/>)
                                    
                            }

                            {
                                new Array(5-turn).fill(0).map((_,i)=><ContenedorWord key={i}
                                    wordShow={''}/>)
                            }
                        </div> 
                        }
                        
                            
                        </div>
                
                </div>
                )
            }
            
            
        </>
    )
}
