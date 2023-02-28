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
  CFormTextarea,
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
  const [menu, setMenu] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const updateMenu = async (e) => {
    e.preventDefault()
    await axios.patch(`http://localhost:5000/menu/${id}`, {
      menu: menu,
      description: description,
    })
    navigate('/menu')
  }

  useEffect(() => {
    getMenuById()
  }, [])

  const getMenuById = async () => {
    const response = await axios.get(`http://localhost:5000/menu/${id}`)
    setMenu(response.data.menu)
    setDescription(response.data.description)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit Menu</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={updateMenu}>
                <div className="mb-3">
                  <CFormLabel>Menu</CFormLabel>
                  <CFormInput type="text" value={menu} onChange={(e) => setMenu(e.target.value)} />
                </div>
                <div className="mb-3">
                  <CFormLabel>Deskripsi</CFormLabel>
                  <CFormTextarea
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
