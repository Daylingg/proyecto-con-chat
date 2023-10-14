import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { canvasCreator, drawMan, initialAlfabet, obtPalabraFetch, removeAccents } from '../helper/functions'
import { Header } from './Header'

const Ahorcado = () => {

    const canvasR=useRef(null)
    const [alfabeto, setAlfabeto] = useState(initialAlfabet)
    
    const [palabraEscondida, setPalabraEscondida] = useState('') 
    const [palabra, setPalabra] = useState('')
    const [error, setError] = useState('')
    const [contP, setContP] = useState(0)
    

    useEffect(() => {

        obtPalabraFetch()
        .then(resp=>{
            setPalabraEscondida(resp.split('').fill('_'))
            setPalabra(resp.toUpperCase())
        })
        .catch(err=>{ 
            setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion")})

        }, [])

    let count=contP

    let palabraAdivinar=''
    

useEffect(() => {
    
    let { initialDrawing } = canvasCreator(canvasR);
        initialDrawing();
        
        resetDatosRef.current();
    }, [])


    const handleGame=(value,i)=>{
        
        let letra =value, 
        palabraSpan=palabra,
        letraPalabra=[...palabraEscondida],
        letraSelect=[...alfabeto]

        palabraAdivinar=removeAccents(palabraSpan)
        palabraAdivinar= palabraAdivinar.split('')

        if(alfabeto[i].select===false){
            
            if(palabraAdivinar.includes(letra)){

                palabraAdivinar.forEach((char, index) => {
                    if (char === letra) {
                    letraPalabra[index]=char
                    setPalabraEscondida(letraPalabra)
                    }            
                })
                
            }else{
                count+=1
                setContP(contP + 1)
            
                drawMan(count,canvasR);
                
            }
        }
        

        letraSelect[i].select=true
        setAlfabeto(letraSelect)

    }

    const resultado=(cont, palabra,msg)=>{


        if(cont===6){
            return Swal.fire({icon:'error',text:`Has perdido el juego 😢 la palabra era ${msg.toUpperCase()}`})
                .then(res => {
                    if(res.isConfirmed){
                        cleanGame()
                } })
        }
            else { 
                if( (!palabra.includes('_') && palabra.length>0)){
                
                    return Swal.fire({icon:'success',text:`Has ganado el juego 🤩 la palabra era ${msg.toUpperCase()}`})
                    .then(res => {
                        if(res.isConfirmed){
                        cleanGame()
                    } })
                }
                
        }
        
        
    }

    resultado(contP,palabraEscondida,palabra)

    const cleanGame=()=>{
        let { initialDrawing } = canvasCreator(canvasR);
        initialDrawing()
        setContP(0)
        setPalabra('')
        setPalabraEscondida('')
        
        setAlfabeto(alfabeto.map(letra => ({...letra, select: false})))

        obtPalabraFetch()
            .then(resp=>{
                setPalabraEscondida(resp.split('').fill('_'))
                setPalabra(resp.toUpperCase())
            })
            .catch(err=>{ console.log("Ocurrio un error inesperado. Revise la conexion")})

            
    }

    const resetDatosRef = useRef(cleanGame);

    return (
    <>
    <Header/>
    <div className="container">      
        
        {palabraEscondida && <div id="user-input-section">{
        palabraEscondida.map((value,i)=>(<span className="dashes" key={i}>{value}</span>))
        }</div>}
        
        <canvas ref={canvasR} id="canvas"></canvas>

        {palabraEscondida && <div className="letter-container" id="bot">{
            alfabeto.map((value,i)=>(<div  className={'alfabeto ' + ((value.select)?'button':'')} key={i} onClick={()=>{handleGame(value.letra,i)}}>{value.letra}</div>))}</div>}

        </div>
    </>
    )
}


export default Ahorcado