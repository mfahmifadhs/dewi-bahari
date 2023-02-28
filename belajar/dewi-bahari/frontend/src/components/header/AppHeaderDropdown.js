import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
} from '@coreui/react'
import { cilSettings, cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('token'))

  const Logout = async (e) => {
    e.preventDefault()
    try {
      // await axios.delete('http://localhost:5000/logout')
      localStorage.clear()
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
        <span style={{ marginLeft: '12px' }}>{user.email}</span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href={`/#/us/edit/${user.id}`}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem>
          <CForm onSubmit={Logout}>
            <button type="submit" style={{ border: 'none', padding: '0', background: 'none' }}>
              <CIcon icon={cilAccountLogout} className="me-2" />
              Keluar
            </button>
          </CForm>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
