import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm'
import { startRegisterWithEmailPassName } from '../actions/auth';
import { removeError, setError } from '../actions/ui';
import Add from '../assets/StoreLogo.scale-100.png'
import ImgUnd from '../assets/imgUndefine.jpg'


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const {msjError} = useSelector( state => state.ui );


    const [formValues,handleInputChange] = useForm({
        name: 'Daylin',
        email:'day@gmail.com',
        password:'123456',
        password2:'123456'
    })

const {name,email,password,password2} = formValues

const handleRegister = (e) => {
    e.preventDefault()
    const file=e.target[4].files[0]
    
    if( isFormValid()){
        dispatch(startRegisterWithEmailPassName(email,password,name,file))
    }


}

const isFormValid = () => {

    if(name.trim().length === 0){
        dispatch(setError('name is required'))
        
        Swal.fire('Error',msjError, 'error')
        return false
        }else if (!validator.isEmail(email)){//si no es un email q haga lo siguiente
        dispatch(setError('el email es incorrecto'))
        Swal.fire('Error',msjError, 'error')
        return false
        }else if(password !== password2 || password.length < 5){
        dispatch(setError('Las contraseñas no son iguales o son menores de 6 caracteres'))
        Swal.fire('Error',msjError, 'error')
        
        return false
    }

    dispatch(removeError())
    return true
}

return (
    <>
        <h3 className='auth__title'>Register</h3>

        <form onSubmit={handleRegister}
        className='animate__animated animate__fadeIn animate__faster'
        >

        {
            msjError &&
            (<div className='auth__alert-error'>
            {msjError}
        </div>)
        }

            <input className='auth__input' type='text'
            placeholder='name'
            name='name'
            autoComplete='off'
            value={name}
            onChange={handleInputChange}
            />
            <input className='auth__input' type='text'
            placeholder='email'
            name='email'
            autoComplete='off'
            value={email}
            onChange={handleInputChange}
            />
            <input className='auth__input' type='password'
            placeholder='123456'
            name='password'
            value={password}
            onChange={handleInputChange}
            />
            <input className='auth__input' type='password'
            placeholder='123456'
            name='password2'
            value={password2}
            onChange={handleInputChange}
            />
            <input className='auth__input file' type='file' id='fileSelector' style={{display:'none'}} />
            <label className='label-reg' htmlFor='fileSelector'>
                <img src={Add}/>
                <span>Add Avatar</span>
            </label>
            <button className='btn btn-primary btn-blockmb-5' type='submit'>
                Register
            </button>
            
        
            <Link className='link' to='/auth/login'>Alredy Register</Link>
        </form>
    </>
    )
}