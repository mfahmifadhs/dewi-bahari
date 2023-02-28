import React, { useEffect, useState } from 'react'

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
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilPencil, cilSave } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@coreui/coreui'

const Edit = () => {
  const [roleId, setRoleId] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const updateUser = async (e) => {
    e.preventDefault()
    await axios.patch(`http://localhost:5000/us/${id}`, {
      roleId,
      email,
      name,
      phoneNum,
      address,
    })
    if (email) {
      localStorage.clear()
      navigate('/')
    } else {
      navigate('/us')
    }
  }

  useEffect(() => {
    getUserById()
  }, [])

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/us/${id}`)
    setRoleId(response.data.roleId)
    setEmail(response.data.email)
    setName(response.data.name)
    setPhoneNum(response.data.phoneNum)
    setAddress(response.data.address)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit Pengguna</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={updateUser}>
                <div className="mb-3">
                  <CFormLabel>Role</CFormLabel>
                  <CCol xs={4}>
                    <CFormSelect
                      size="xs"
                      className="mb-3"
                      value={roleId}
                      onChange={(e) => setRoleId(e.target.value)}
                    >
                      <option>-- Pilih Role --</option>
                      <option value="1">SUPER ADMIN</option>
                      <option value="2">SUPER USER</option>
                      <option value="3">USER</option>
                    </CFormSelect>
                  </CCol>
                </div>
                <div className="mb-3">
                  <CFormLabel>Email</CFormLabel>
                  <CFormInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Nama</CFormLabel>
                  <CFormInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap"
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Kontak</CFormLabel>
                  <CFormInput
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="No. Handphone Aktif"
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Alamat</CFormLabel>
                  <CFormTextarea
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukan Alamat Lengkap"
                  ></CFormTextarea>
                </div>
                <CButton
                  color="primary"
                  type="submit"
                  onClick={() => window.confirm('Simpan Perubahan?')}
                >
                  <strong>
                    <CIcon style={{ color: 'dark' }} icon={cilSave} size="lg" title="Edit Menu" />
                    &nbsp; SIMPAN
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

export default Edit
