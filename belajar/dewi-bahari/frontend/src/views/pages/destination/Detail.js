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
import { cilCalendar, cilCheck, cilCheckCircle, cilUser, cilXCircle } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Destination = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [kdProv, setKdProv] = useState([])
  const [kdKab, setKdKab] = useState([])
  const [destination, setDestination] = useState([])
  const [address, setAddress] = useState([])
  const [description, setDescription] = useState([])
  const [embMap, setEmbMap] = useState([])
  const [article, setArticle] = useState([])
  const [url, setUrl] = useState([])
  const [isApprove, setApprove] = useState([])
  const [approval, setApproval] = useState('false')
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState([])
  const [visible, setVisible] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    getDestinationById()
    getArticle()
  }, [])

  const detailArticle = (articleId) => {
    navigate(`/ar/${articleId}`)
  }

  const approveFalse = async (e) => {
    // e.preventDefault()
    console.log(approval)
    try {
      await axios.patch(`http://localhost:5000/dt/v/${id}`, {
        isApprove: approval,
        note,
      })
      navigate('/dt')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const approveTrue = async (e) => {
    // e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/dt/v/${id}`, {
        isApprove: e,
      })
      navigate('/dt')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const getDestinationById = async () => {
    const response = await axios.get(`http://localhost:5000/dt/${id}`)
    setKdProv(response.data.t_province.province)
    setKdKab(response.data.t_city.city)
    setCategory(response.data.category)
    setEmbMap(response.data.embMap)
    setDestination(response.data.destination)
    setAddress(response.data.address)
    setDescription(response.data.address)
    setUrl(response.data.url)
    setApprove(response.data.isApprove)
    setNote(response.data.note)
  }

  const getArticle = async () => {
    const response = await axios.get(`http://localhost:5000/ar/dt/${id}`)
    console.log('data', response.data)
    setArticle(response.data)
  }

  const submit = () => {
    confirmAlert({
      title: 'Persetujuan',
      message: 'Apakah anda menyetujui destinasi ini ?',
      buttons: [
        {
          label: 'Setuju',
          onClick: () => approveTrue('true'),
        },
      ],
    })
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
                      <label>Provinsi</label>
                      <h6>{kdProv}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Kabupaten/Kota</label>
                      <h6>{kdKab}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Destinasi Wisata</label>
                      <h6>{destination}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Kelas :</label>
                      <h6>{category}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Deskripsi</label>
                      <h6>{description}</h6>
                    </CCol>
                    <CCol md={6} className="p-2">
                      <label>Lokasi</label>
                      <h6>{address}</h6>
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
                            <p>text</p>
                          </div>
                        )}
                      </h6>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <h6 className="mb-2">Peta Lokasi</h6>
              <div dangerouslySetInnerHTML={{ __html: embMap }} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <h5>Artikel Terkait</h5>
        {article.map((value, index) => (
          <CCol md={4} key={value.id}>
            <div style={{ cursor: 'pointer', height: '100%' }}>
              <CCard onClick={() => detailArticle(value.id)}>
                <CCardHeader>
                  <CImage
                    src={value.url}
                    className="img-fluid p-1"
                    style={{ height: '250px', width: '100%' }}
                  />
                  <br />
                  <small style={{ fontSize: '13px' }}>
                    <CIcon style={{ color: 'dark' }} icon={cilUser} size="md" title="Edit Menu" />
                    {''} {value.t_user.name}
                  </small>{' '}
                  <small style={{ fontSize: '13px' }}>
                    <CIcon
                      style={{ color: 'dark' }}
                      icon={cilCalendar}
                      size="md"
                      title="Edit Menu"
                    />
                    {''} {moment(value.createdAt).format('HH:mm / DD-MM-Y')}
                  </small>
                </CCardHeader>
                <CCardBody>
                  <h6>{value.title}</h6>
                  <p>
                    <div dangerouslySetInnerHTML={{ __html: value.content }} />
                  </p>
                </CCardBody>
              </CCard>
            </div>
          </CCol>
        ))}
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
              onClick={() => window.confirm('Tolak Destinasi Wisata Ini?')}
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
