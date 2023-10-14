import React from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginEmailPass, startRegisterWithEmailPassName } from '../actions/auth'
import validator from 'validator'
import { removeError, setError } from '../actions/ui'
import Swal from 'sweetalert2'
import Add from '../assets/StoreLogo.scale-100.png'

export const LoginScreen = () => {

const dispatch = useDispatch();
const {loading, msjError} = useSelector( state => state.ui );

const [formValues, handleInputChange] = useForm({
    email:'day@gmail.com',
    password:'123456'
})

const {email,password}= formValues

const [formValuesRegister,handleRegisterInputChange] = useForm({
    name: 'Daylin',
    emailR:'day@gmail.com',
    passwordR:'123456',
    password2:'123456'
})

const {name,emailR,passwordR,password2} = formValuesRegister


const handleLogin=(e)=>{
    e.preventDefault()
    if( isFormValid()){
    dispatch(startLoginEmailPass(email,password))
    
    }
}

const isFormValid = () => {

    if (!validator.isEmail(email)){//si no es un email q haga lo siguiente
        dispatch(setError('El email es incorrecto'))
        Swal.fire('Error','El email es incorrecto','error')
        
        return false
    }else if(password.length < 5){
        dispatch(setError('La contraseña no puede tener menos de 6 caracteres'))
        Swal.fire('Error','La contraseña no puede tener menos de 6 caracteres','error')
        
        return false
    }
    
    dispatch(removeError())
    return true
}

const isFormValidR =()=>{
    if(name.trim().length === 0){
        dispatch(setError('Name is required'))
        console.log(emailR)
        Swal.fire('Error','Name is required', 'error')
        return false

        }else if ( emailR.length===0 || !validator.isEmail(emailR)){//si no es un email q haga lo siguiente
        dispatch(setError('el email es incorrecto'))
        Swal.fire('Error','el email es incorrecto o no ha escrito ninguno', 'error')
        return false
        }else if(passwordR !== password2 || passwordR.length < 5){
        dispatch(setError('Las contraseñas no son iguales o son menores de 6 caracteres'))
        Swal.fire('Error','Las contraseñas no son iguales o son menores de 6 caracteres', 'error')
        
        return false
    }

    dispatch(removeError())
    return true

}

const handleRegister=(e)=>{
    e.preventDefault()
    const file=e.target[4].files[0]
    
    if( isFormValidR()){
        dispatch(startRegisterWithEmailPassName(emailR,passwordR,name,file))
    }
}



    return (
        <>
            <div className="container_auth login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='email'
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='name'
                                value={name}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='emailR'
                                value={emailR}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='passwordR'
                                value={passwordR}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='password2'
                                value={password2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <input className='auth__input file' type='file' id='fileSelector' style={{display:'none'}} />
            <label className='label-reg' htmlFor='fileSelector'>
                <img src={Add}/>
                <span>Add Avatar</span>
            </label>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Creat Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
