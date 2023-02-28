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
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { cilCheckCircle, cilXCircle } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Destination = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [users, setUser] = useState([])
  const [destination, setDestination] = useState([])
  const [title, setTitle] = useState([])
  const [content, setContent] = useState([])
  const [url, setUrl] = useState([])
  const [isApprove, setApprove] = useState([])
  const [approval, setApproval] = useState('false')
  const [note, setNote] = useState('')
  const [createdAt, setCreatedAt] = useState([])
  const [msg, setMsg] = useState([])
  const [visible, setVisible] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    getArticleById()
  }, [])

  const approveFalse = async (e) => {
    // e.preventDefault()
    console.log(approval)
    try {
      await axios.patch(`http://localhost:5000/ar/v/${id}`, {
        isApprove: approval,
        note,
      })
      navigate('/ar')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const approveTrue = async (e) => {
    // e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/ar/v/${id}`, {
        isApprove: e,
      })
      navigate('/ar')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const submit = () => {
    confirmAlert({
      title: 'Persetujuan Artikel',
      message: 'Apakah anda menyetujui artikel ini ?',
      buttons: [
        {
          label: 'Setuju',
          onClick: () => approveTrue('true'),
        },
      ],
    })
  }

  const getArticleById = async () => {
    const response = await axios.get(`http://localhost:5000/ar/${id}`)
    setUser(response.data.t_user.name)
    setDestination(response.data.t_destination.destination)
    setTitle(response.data.title)
    setContent(response.data.content)
    setUrl(response.data.url)
    setApprove(response.data.isApprove)
    setCreatedAt(response.data.createdAt)
    setNote(response.data.note)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol md={4}>
                  <CImage src={url} className="img-fluid" />
                </CCol>
                <CCol md={8}>
                  <CRow>
                    <CCol md={6} className="p-2">
                      <label>Penulis</label>
                      <h6>{users}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Destinasi Wisata Terkait</label>
                      <h6>{destination}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Judul Artikel</label>
                      <h6>{title}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Tanggal :</label>
                      <h6>{moment(createdAt).format('HH:mm / DD MM Y')}</h6>
                    </CCol>
                    <CCol md={12} className="p-2">
                      <label>Status Persetujuan :</label>
                      <h6 className="small mt-2">
                        {user.role == 1 ? (
                          isApprove == 'true' ? (
                            '✅ Sudah Disetujui'
                          ) : isApprove == null ? (
                            <div>
                              <CButton className="btn btn-primary btn-sm" onClick={submit}>
                                <CIcon style={{ color: 'dark' }} icon={cilCheckCircle} size="sm" />
                                Terima
                              </CButton>{' '}
                              <CButton
                                className="btn btn-danger btn-sm"
                                onClick={() => setVisible(!visible)}
                              >
                                <CIcon style={{ color: 'dark' }} icon={cilXCircle} size="sm" />
                                Tolak
                              </CButton>
                            </div>
                          ) : (
                            <div>
                              ❌ Tidak Disetujui
                              <p className="small">({note})</p>
                            </div>
                          )
                        ) : isApprove == 'true' ? (
                          '✅ Sudah Disetujui'
                        ) : isApprove == null ? (
                          'Menunggu Persetujuan'
                        ) : (
                          <div>
                            ❌ Tidak Disetujui
                            <p className="small">({note})</p>
                          </div>
                        )}
                      </h6>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <p className="text-justify">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </p>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CForm onSubmit={approveFalse}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Konfirmasi Penolakan</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormLabel>
              Mengapa anda tidak mengizinkan penambahan baru destinasi wisata ini ?
            </CFormLabel>
            <CFormInput
              className=""
              rows="3"
              type="hidden"
              onChange={(e) => setApproval(e.target.value)}
            ></CFormInput>
            <CFormTextarea
              rows="3"
              type="text"
              onChange={(e) => setNote(e.target.value)}
              placeholder="Alasan penolakan "
            ></CFormTextarea>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton
              color="danger"
              type="submit"
              onClick={() => window.confirm('Tolak Artikel Ini?')}
            >
              Simpan
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default Destination
