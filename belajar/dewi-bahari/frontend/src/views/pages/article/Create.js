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
  CRow,
} from '@coreui/react'
import { cilPlus, cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import moment from 'moment'
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

  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFilePict(image)
    setPreview(URL.createObjectURL(image))
  }

  useEffect(() => {
    addArticle()
    getDestination()
  }, [])

  const addArticle = async (e) => {
    console.log(content)
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:5000/ar',
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
              <strong>Tambah Artikel</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={addArticle}>
                <div className="mb-1">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Penulis*</CFormLabel>
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
                <div className="mb-3">
                  <CFormLabel>Foto Header*</CFormLabel>
                  <CFormInput type="file" onChange={loadImage} required></CFormInput>
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
                <div className="mb-3">
                  <CFormLabel>Judul Artikel*</CFormLabel>
                  <CFormTextarea
                    rows={5}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul Artikel (Max. 500 Karakter)"
                    maxLength={500}
                    required
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel>Isi Artikel*</CFormLabel>
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
                    config={editorConfig}
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
