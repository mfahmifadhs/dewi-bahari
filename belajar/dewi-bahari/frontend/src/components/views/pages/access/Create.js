import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [roleId, setRoleId] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassowrd] = useState('')
  const [confPassword, setConfPassowrd] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const addUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/us', {
        roleId,
        email,
        name,
        phoneNum,
        address,
        password,
        confPassword,
      })
      navigate('/us')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tambah Pengguna</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={addUser}>
                <div className="mb-3">
                  <CFormLabel>Role*</CFormLabel>
                  <CCol xs={4}>
                    <CFormSelect
                      size="xs"
                      className="mb-3"
                      value={roleId}
                      onChange={(e) => setRoleId(e.target.value)}
                      required
                    >
                      <option value="">-- Pilih Role --</option>
                      <option value="1">SUPER ADMIN</option>
                      <option value="2">SUPER USER</option>
                      <option value="3">ADMIN</option>
                    </CFormSelect>
                  </CCol>
                </div>
                <div className="mb-3">
                  <CFormLabel>Email*</CFormLabel>
                  <CFormInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Nama*</CFormLabel>
                  <CFormInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap"
                    required
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Kontak*</CFormLabel>
                  <CFormInput
                    type="number"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="No. Handphone Aktif"
                    required
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Alamat*</CFormLabel>
                  <CFormTextarea
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukan Alamat Lengkap"
                    required
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel>Password*</CFormLabel>
                  <CFormInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassowrd(e.target.value)}
                    placeholder="Password"
                    required
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Konfirmasi Password*</CFormLabel>
                  <br />
                  <span style={{ color: 'red' }}>{msg}</span>
                  <CFormInput
                    type="password"
                    value={confPassword}
                    onChange={(e) => setConfPassowrd(e.target.value)}
                    placeholder="Konfirmasi Password"
                    required
                  ></CFormInput>
                </div>
                <CButton
                  color="primary"
                  type="submit"
                  onClick={() => window.confirm('Tambah Pengguna Baru?')}
                >
                  <strong>
                    <CIcon
                      style={{ color: 'dark' }}
                      icon={cilUserPlus}
                      size="lg"
                      title="Edit Menu"
                    />
                    &nbsp; TAMBAH
                  </strong>
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Create
