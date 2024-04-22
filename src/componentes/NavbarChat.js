import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import Avatar from 'react-avatar-edit'
import { Button } from 'primereact/button'
import { updatePhoto, UpdatePhotoProfile } from '../actions/auth'

export const NavbarChat = () => {
  const navigate = useNavigate()
  const { name, photo } = useSelector((state) => state.auth)
  const [visible, setVisible] = useState(false)
  const [pview, setPview] = useState(false)
  const [profile, setProfile] = useState([])
  const [src, setSrc] = useState(null)
  const [img, setImg] = useState(null)
  const dispatch = useDispatch()

  const onClose = () => {
    setPview(null)
  }

  const onCrop = (view) => {
    setPview(view)
    //console.log(img)
  }

  const onBeforeFileLoad = (elem) => {
    //console.log(elem.target.files[0])
    if (elem.target.files[0]?.size > 71680) {
      alert('File is too big!')
      elem.target.value = ''
    } else {
      setImg(elem.target.files[0])
    }
  }

  const saveProfile = async (e) => {
    if (pview) {
      const urlPhoto = await UpdatePhotoProfile(pview)
      dispatch(updatePhoto(urlPhoto))
      setVisible(false)
    } else {
      setVisible(false)
      //console.log('hola')
    }

    setProfile([...profile, { pview }])
  }

  const handleLogoutChat = () => {
    navigate('/')
  }

  return (
    <div className="navbarChat">
      <span className="logo">Chat</span>
      <div className="user">
        <img src={photo} alt="" onClick={() => setVisible(true)} />

        <div className="dialog-content">
          <Dialog
            visible={visible}
            style={{
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              justifyContent: 'center',
            }}
            header={
              <p className="encabezado" htmlFor="">
                Update profile
              </p>
            }
            onHide={() => setVisible(false)}
          >
            <div className="confirmation-content flex-column items-center">
              <Avatar
                width={300}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                src={src}
              />
              <div className="flex flex-column align-items-center mt-5 w-12">
                <div className="dialog-buttons w-12 mt-4">
                  <Button
                    className="btn-profile "
                    onClick={(e) => saveProfile(e)}
                    label="Save"
                    icon="pi pi-check"
                    severity="info"
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </div>

        <span>{name}</span>
        <button onClick={handleLogoutChat}>Salir</button>
      </div>
    </div>
  )
}
