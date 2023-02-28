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
  const [category, setCategory] = useState('')
  const [partner, setPartner] = useState('')
  const [filePict, setFilePict] = useState('')
  const [preview, setPreview] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFilePict(image)
    setPreview(URL.createObjectURL(image))
  }

  useEffect(() => {
    updatePartner()
    getPartnerById()
  }, [])

  const updatePartner = async (e) => {
    e.preventDefault()
    await axios.patch(
      `http://localhost:5000/pt/${id}`,
      {
        category,
        partner,
        filePict,
      },
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      },
    )
    navigate('/pt')
  }

  const getPartnerById = async () => {
    const response = await axios.get(`http://localhost:5000/pt/${id}`)
    setCategory(response.data.category)
    setPartner(response.data.partner)
    setFilePict(response.data.filePict)
    setPreview(response.data.url)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit Mitra</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={updatePartner}>
                <div className="mb-3">
                  <CFormLabel>Kategori</CFormLabel>
                  <CFormInput
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel>Nama Mitra</CFormLabel>
                  <CFormTextarea
                    rows="3"
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel>Logo Mitra*</CFormLabel>
                  <CFormInput type="file" onChange={loadImage}></CFormInput>
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </div>
                {preview ? (
                  <CCol md={2}>
                    <figure className="image is-128x128 mb-5 border border-solid">
                      <img src={preview} alt="Preview Image" className="img-fluid" width="200" />
                    </figure>
                  </CCol>
                ) : (
                  ''
                )}
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
