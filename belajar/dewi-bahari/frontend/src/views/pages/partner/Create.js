import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

const Create = () => {
  const [category, setCategory] = useState('')
  const [partner, setPartner] = useState('')
  const [filePict, setFilePict] = useState('')
  const [preview, setPreview] = useState('')

  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFilePict(image)
    setPreview(URL.createObjectURL(image))
  }

  useEffect(() => {
    addPartner()
  }, [])

  const addPartner = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:5000/pt',
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
              <strong>Tambah Partner</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={addPartner}>
                <div className="mb-3">
                  <CRow>
                    <CCol xs={12}>
                      <CFormLabel>Kategori*</CFormLabel>
                      <CFormInput
                        size="xs"
                        className="mb-3"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12}>
                      <CFormLabel>Nama Mitra*</CFormLabel>
                      <CFormInput
                        size="xs"
                        className="mb-1"
                        onChange={(e) => setPartner(e.target.value)}
                        required
                      ></CFormInput>
                    </CCol>
                  </CRow>
                </div>
                <div className="mb-3">
                  <CFormLabel>Logo Mitra*</CFormLabel>
                  <CFormInput type="file" onChange={loadImage} required></CFormInput>
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </div>
                {preview ? (
                  <figure className="image is-128x128">
                    <img src={preview} alt="Preview Image" className="img-fluid" width="200" />
                  </figure>
                ) : (
                  ''
                )}

                <CButton
                  color="primary"
                  type="submit"
                  onClick={(e) => window.confirm('Tambah Mitra Baru?')}
                  className="mt-4"
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
