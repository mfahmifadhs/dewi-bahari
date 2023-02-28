import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilInfo, cilPencil } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmButton from 'src/components/ConfirmButton'

const Gallery = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [gallery, setGallery] = useState([])
  const [msg, setMsg] = useState([])

  useEffect(() => {
    getGallery()
    deleteGallery()
  }, [])

  const getGallery = async () => {
    let response = ''
    if (user.role == 1) {
      response = await axios.get('http://localhost:5000/gl')
    } else {
      response = await axios.get(`http://localhost:5000/gl/us/${user.id}`)
    }
    setGallery(response.data)
  }

  const deleteGallery = async (id) => {
    const response = await axios.delete(`http://localhost:5000/gl/${id}`)
    getGallery()
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
          <CTable align="middle" className="mb-4 border bg-white table-bordered" hover responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell className="text-center">No</CTableHeaderCell>
                <CTableHeaderCell>Kreator</CTableHeaderCell>
                <CTableHeaderCell>Destinasi Terkait</CTableHeaderCell>
                <CTableHeaderCell>Judul</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {gallery.map((value, index) => (
                <CTableRow v-for="item in tableItems" key={value.id}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.t_user.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.t_destination.destination}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.title}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/gl/${value.id}`} className="btn btn-primary">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilInfo}
                        size="lg"
                        title="Detail Galeri Wisata"
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
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </>
  )
}

export default Gallery
