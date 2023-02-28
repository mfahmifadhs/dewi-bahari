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
import { cilPlus, cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import moment from 'moment'
import '../../../assets/style.css'

const Create = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const idGalleries = moment().format('dhms')
  const [userId, setUserId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [title, setTitle] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [preview, setPreview] = useState([])
  const [destinations, setDestination] = useState([])

  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  // const loadImage = (e) => {
  //   const image = e.target.files[0]
  //   setSelectedFiles(image)
  //   setPreview(URL.createObjectURL(image))
  // }

  const handleFileSelect = (event) => {
    const files = event.target.files
    const data = Object.keys(files).map((key) => files[key])
    setSelectedFiles(data)
    const preview = []

    for (let i = 0; i < data.length; i++) {
      preview.push(URL.createObjectURL(data[i]))
      setPreview(preview)
    }
  }

  useEffect(() => {
    addGaleries()
    getDestination()
  }, [])

  const addGaleries = async (e) => {
    e.preventDefault()
    console.log('data', selectedFiles)
    try {
      await axios.post(
        'http://localhost:5000/gl',
        {
          id: idGalleries,
          userId: user.id,
          destinationId,
          title,
          selectedFiles,
        },
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      )
      navigate('/gl')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const getDestination = async () => {
    let response = ''
    if (user.role == 1) {
      response = await axios.get('http://localhost:5000/dt')
    } else {
      response = await axios.get(`http://localhost:5000/dt/us/${user.id}`)
    }
    setDestination(response.data)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tambah Galeri</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={addGaleries}>
                <div className="mb-1">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Kreator*</CFormLabel>
                      <CFormSelect
                        size="xs"
                        className="mb-3"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                      >
                        <option key={user.id}>{user.name}</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel>Tanggal*</CFormLabel>
                      <CFormInput
                        type="text"
                        value={moment().format('HH:mm / DD MM Y')}
                        readOnly
                      ></CFormInput>
                    </CCol>
                  </CRow>
                </div>
                <div className="mb-1">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Destinasi Wisata Terkait*</CFormLabel>
                      <CFormSelect
                        size="xs"
                        className="mb-3"
                        value={destinationId}
                        onChange={(e) => setDestinationId(e.target.value)}
                        required
                      >
                        <option value="">-- Pilih Destinasi --</option>
                        {destinations.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.destination}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </div>
                <div className="mb-1">
                  <CFormLabel>Judul Galeri*</CFormLabel>
                  <CFormInput
                    size="xs"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul Galeri"
                    required
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Foto*</CFormLabel>
                  <CFormInput
                    type="file"
                    onChange={handleFileSelect}
                    multiple
                    required
                  ></CFormInput>
                  <span className="file-cta">
                    <span className="file-label small">(Ukuran gambar maksimal 5 MB)</span>
                  </span>
                </div>
                <div className="mb-3">
                  {preview.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      className="img-fluid m-2"
                      width="200"
                    />
                  ))}
                  <p>
                    <span className="text-danger mb-3">{msg}</span>
                  </p>
                </div>

                <CButton
                  color="primary"
                  type="submit"
                  onClick={(e) => window.confirm('Tambah Baru?')}
                  className="mt-4"
                >
                  <strong>
                    <CIcon style={{ color: 'dark' }} icon={cilPlus} size="lg" />
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
