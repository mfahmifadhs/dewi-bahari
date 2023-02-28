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
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../../../assets/style.css'

const Create = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const [userId, setUserId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [filePict, setFilePict] = useState('')
  const [preview, setPreview] = useState('')
  const [destinations, setDestination] = useState([])
  const { id } = useParams()

  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFilePict(image)
    setPreview(URL.createObjectURL(image))
  }

  useEffect(() => {
    updateArticle()
    getDestination()
    getArticleById()
  }, [])

  const updateArticle = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(
        `http://localhost:5000/ar/${id}`,
        {
          userId: user.id,
          destinationId,
          title,
          content,
          filePict,
          isApprove: null,
        },
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      )
      navigate('/ar')
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

  const getArticleById = async () => {
    const response = await axios.get(`http://localhost:5000/ar/${id}`)
    setUserId(response.data.userId)
    setDestinationId(response.data.destinationId)
    setTitle(response.data.title)
    setContent(response.data.content)
    setFilePict(response.data.filePict)
    setPreview(response.data.url)
  }

  const editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'image',
    ],
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit Artikel</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={updateArticle}>
                <div className="mb-1">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Penulis</CFormLabel>
                      <CFormSelect
                        size="xs"
                        className="mb-3"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      >
                        <option key={user.id}>{user.name}</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel>Tanggal</CFormLabel>
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
                      <CFormLabel>Destinasi Wisata Terkait</CFormLabel>
                      <CFormSelect
                        size="xs"
                        className="mb-3"
                        value={destinationId}
                        onChange={(e) => setDestinationId(e.target.value)}
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
                  <CFormLabel>Foto Header</CFormLabel>
                  <CFormInput type="file" onChange={loadImage}></CFormInput>
                  <span className="file-cta">
                    <span className="file-label small">(Ukuran gambar maksimal 5 MB)</span>
                  </span>
                </div>
                {preview ? (
                  <figure className="image is-128x128">
                    <img src={preview} alt="Preview Image" className="img-fluid" width="200" />
                  </figure>
                ) : (
                  ''
                )}
                <span className="text-danger mb-3">{msg}</span>
                <div className="mb-3 mt-3">
                  <CFormLabel>Judul Artikel</CFormLabel>
                  <CFormInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul Artikel (Max. 100 Karakter)"
                    maxLength={100}
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Isi Artikel</CFormLabel>
                  {/* <CFormTextarea
                    rows="10"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Isi Artikel tidak boleh mengandung isu / sara"
                    required
                  ></CFormTextarea> */}
                  <CKEditor
                    editor={ClassicEditor}
                    className="ck-editor__editable"
                    data={content}
                    config={editorConfig}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData()
                      setContent(data)
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor)
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor)
                    }}
                  />
                </div>

                <CButton
                  color="primary"
                  type="submit"
                  onClick={(e) => window.confirm('Edit Artikel?')}
                  className="mt-4"
                >
                  <strong>
                    <CIcon style={{ color: 'dark' }} icon={cilPencil} size="lg" title="Edit Menu" />
                    &nbsp; UBAH
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
