import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CImage,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilCalendar, cilPencil, cilUser } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment'

const User = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [email, setEmail] = useState([])
  const [name, setName] = useState([])
  const [phoneNum, setPhoneNum] = useState([])
  const [address, setAddress] = useState([])
  const [password, setPassword] = useState([])
  const [url, setUrl] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getUserById()
  }, [])

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/us/${id}`)
    setRole(response.data.t_role.role)
    setEmail(response.data.email)
    setName(response.data.name)
    setPhoneNum(response.data.phoneNum)
    setAddress(response.data.address)
    setPassword(response.data.passwordText)
  }

  return (
    <>
      <div className="container">
        <div className="container-fluid" style={{ padding: '0px 200px' }}>
          <h5 className="mb-4">Detail Informasi Pengguna</h5>
          <CRow>
            <CCol md={4}>
              <CCard style={{ height: '100%' }}>
                <CCardBody>
                  <CImage
                    src="https://www.pngitem.com/pimgs/m/78-786314_computer-user-icon-peolpe-avatar-group-people-avatar.png"
                    className="img-fluid"
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={8}>
              <CCard style={{ height: '100%' }}>
                <CCardBody>
                  <div className="form-group row p-2">
                    <label className="col-md-4">Role</label>
                    <div className="col-md-8">: {role}</div>
                  </div>
                  <div className="form-group row p-2">
                    <label className="col-md-4">Email</label>
                    <div className="col-md-8">: {email}</div>
                  </div>
                  <div className="form-group row p-2">
                    <label className="col-md-4">Nama Pengguna</label>
                    <div className="col-md-8">: {name}</div>
                  </div>
                  <div className="form-group row p-2">
                    <label className="col-md-4">Nomor Hp</label>
                    <div className="col-md-8">: {phoneNum}</div>
                  </div>
                  <div className="form-group row p-2">
                    <label className="col-md-4">Alamat</label>
                    <div className="col-md-8">: {address}</div>
                  </div>
                  <div className="form-group row p-2">
                    <label className="col-md-4">Password</label>
                    <div className="col-md-8">: {password}</div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}

export default User
