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
import { cilPencil, cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import '../../../assets/style.css'

const Create = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const [userId, setUserId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [title, setTitle] = useState('')

  const [filePict, setFilePict] = useState([])
  const [preview, setPreview] = useState([])
  const [category, setCategory] = useState([])
  const [destinations, setDestination] = useState([])

  const [msg, setMsg] = useState('')
  const { galleryId, id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getGallery()
    getDetailGallery()
    updateDetailGallery()
    getDestination()
  }, [])

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFilePict(image)
    setPreview(URL.createObjectURL(image))
  }

  const updateDetailGallery = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `http://localhost:5000/gd/update/${galleryId}/${id}`,
        {
          userId,
          destinationId,
          title,
          filePict,
        },
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      )
      navigate('/gl')
      setMsg(response.data.msg)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const getDetailGallery = async () => {
    const response = await axios.get(`http://localhost:5000/gd/detail/${id}`)
    setFilePict(response.data.filePict)
    setPreview(response.data.url)
    setCategory(response.data.category)
  }

  const getGallery = async () => {
    const response = await axios.get(`http://localhost:5000/gl/${galleryId}`)
    setUserId(response.data.userId)
    setDestinationId(response.data.destinationId)
    setTitle(response.data.title)
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
              <strong>Ubah Galeri</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={updateDetailGallery}>
                <div className="mb-1">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Kreator*</CFormLabel>
                      <CFormSelect
                        size="xs"
                        className="mb-3"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        disabled
                      >
                        <option key={user.id}>{user.name}</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel>Tanggal*</CFormLabel>
                      <CFormInput
                        type="text"
                        value={moment().format('HH:mm / DD MM Y')}
                        disabled
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
                  <CFormInput type="file" onChange={loadImage} required></CFormInput>
                  <span className="file-cta">
                    <span className="file-label small">(Ukuran gambar maksimal 5 MB)</span>
                  </span>
                </div>
                <div className="mb-3">
                  {preview ? (
                    category == 'image' ? (
                      <figure className="image is-128x128">
                        <img src={preview} alt="Preview Image" className="img-fluid" width="200" />
                      </figure>
                    ) : (
                      <video
                        src={preview}
                        controls
                        className="img-fluid border border-dark"
                        width="400"
                      />
                    )
                  ) : (
                    ''
                  )}
                  <p>
                    <span className="text-danger mb-3">{msg}</span>
                  </p>
                </div>

                <CButton
                  color="primary"
                  type="submit"
                  onClick={(e) => window.confirm('Edit data ini?')}
                  className="mt-4"
                >
                  <strong>
                    <CIcon style={{ color: 'dark' }} icon={cilPencil} size="lg" />
                    &nbsp; EDIT
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
