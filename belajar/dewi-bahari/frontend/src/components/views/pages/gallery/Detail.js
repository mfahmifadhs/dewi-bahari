import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormLabel,
  CInputGroup,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { cilPencil } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment'
import 'react-confirm-alert/src/react-confirm-alert.css'
import ConfirmButton from 'src/components/ConfirmButton'

const Destination = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [destination, setDestination] = useState([])
  const [title, setTitle] = useState([])
  const [date, setDate] = useState([])
  const [filePict, setFilePict] = useState([])
  const [visible, setVisible] = useState(false)
  const [msg, setMsg] = useState([])

  const { id } = useParams()

  useEffect(() => {
    getGallery()
    getFilePict()
    deleteGallery()
  }, [])

  const getGallery = async () => {
    const response = await axios.get(`http://localhost:5000/gl/${id}`)
    setUsers(response.data.t_user.name)
    setDestination(response.data.t_destination.destination)
    setTitle(response.data.title)
    setDate(response.data.createdAt)
  }

  const getFilePict = async () => {
    const response = await axios.get(`http://localhost:5000/gd/${id}`)
    setFilePict(response.data)
  }

  const deleteGallery = async (id) => {
    const response = await axios.delete(`http://localhost:5000/gd/${id}`)
    getFilePict()
    setMsg(response.data.msg)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          {msg == null ? (
            ''
          ) : (
            <CCard className="mb-3 rounded">
              <span className="p-3 text-success">{msg}</span>
            </CCard>
          )}
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol sm={1}>Tanggal</CCol>
                <CCol sm={5}>: {moment(date).format('DD MMMM Y')}</CCol>
              </CRow>
              <CRow>
                <CCol sm={1}>Kreator</CCol>
                <CCol sm={5}>: {users}</CCol>
              </CRow>
              <CRow>
                <CCol sm={1}>Destinasi</CCol>
                <CCol sm={5}>: {destination}</CCol>
              </CRow>
              <CRow>
                <CCol sm={1}>Judul</CCol>
                <CCol sm={5}>: {title}</CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {filePict.map((value, index) => (
                  <CCol md={3} key={index} className="p-2">
                    <CCard style={{ height: '100%' }}>
                      <CCardHeader
                        style={{ cursor: 'pointer', height: '100%' }}
                        onClick={() => setVisible(!visible)}
                      >
                        {value.category == 'image' ? (
                          <img src={value.url} className="img-fluid border border-dark" />
                        ) : (
                          <video
                            src={value.url}
                            controls
                            className="img-fluid border border-dark"
                          />
                        )}
                      </CCardHeader>
                      <CCardFooter className="text-center">
                        <Link
                          to={`/gl/edit/${value.galleryId}/${value.id}`}
                          className="btn btn-warning"
                        >
                          <CIcon
                            style={{ color: 'dark' }}
                            icon={cilPencil}
                            size="lg"
                            title="Edit Galeri Wisata"
                          />
                        </Link>{' '}
                        {user.role != 1 ? (
                          ''
                        ) : (
                          <ConfirmButton
                            className="btn btn-danger"
                            message="Apakah anda ingin menghapus data ini?"
                            onConfirm={() => deleteGallery(value.id)}
                          />
                        )}
                      </CCardFooter>
                    </CCard>

                    {/* Modal */}
                    <CModal visible={visible} onClose={() => setVisible(false)}>
                      <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>{title}</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        {value.category == 'image' ? (
                          <img src={value.url} className="img-fluid border border-dark" />
                        ) : (
                          <video
                            src={value.url}
                            controls
                            className="img-fluid border border-dark"
                          />
                        )}
                      </CModalBody>
                    </CModal>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Destination
